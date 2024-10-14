import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { StandardResponse } from '../interfaces/response.interface';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    signUpDto: SignUpDto,
  ): Promise<StandardResponse<{ user: User; token: string }>> {
    const { email, name, password } = signUpDto;

    if (!name || !email || !password) {
      throw new HttpException(
        { success: false, message: 'All fields are required' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      this.logger.warn(`Attempt to sign up with existing email: ${email}`);
      throw new HttpException(
        { success: false, message: 'Email already exists' },
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
    });

    try {
      const savedUser = await newUser.save();
      this.logger.log(`New user signed up: ${email}`);

      const userCreated = savedUser.toObject();
      delete userCreated.password;

      const payload = { email: userCreated.email, sub: userCreated._id };
      const token = this.jwtService.sign(payload);

      return {
        success: true,
        message: 'User signed up successfully',
        data: { user: userCreated, token },
      };
    } catch (error) {
      this.logger.error('Sign-up failed', error.stack);
      throw new HttpException(
        { success: false, message: 'Server error' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async logIn(
    email: string,
    password: string,
  ): Promise<StandardResponse<{ token: string; user: User }>> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      this.logger.warn(`Login attempt with invalid email: ${email}`);
      throw new HttpException(
        { success: false, message: 'Invalid email or password' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password attempt for email: ${email}`);
      throw new HttpException(
        { success: false, message: 'Invalid email or password' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);

    const userData = user.toObject();
    delete userData.password;

    this.logger.log(`User logged in: ${email}`);
    return {
      success: true,
      message: 'Login successful',
      data: { user: userData, token },
    };
  }
}
