import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { StandardResponse } from '../interfaces/response.interface';
import { SignUpDto } from './dto/signup.dto';
import { User } from './user.schema';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly logger;
    constructor(userModel: Model<User>, jwtService: JwtService);
    signUp(signUpDto: SignUpDto): Promise<StandardResponse<{
        user: User;
        token: string;
    }>>;
    logIn(email: string, password: string): Promise<StandardResponse<{
        token: string;
        user: User;
    }>>;
}
