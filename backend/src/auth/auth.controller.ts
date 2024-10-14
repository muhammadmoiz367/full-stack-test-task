import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto, @Res() res: Response) {
    const response = await this.authService.signUp(signUpDto);
    return res.status(HttpStatus.CREATED).json(response);
  }

  @Post('login')
  async logIn(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
  ) {
    const response = await this.authService.logIn(body.email, body.password);
    return res.status(HttpStatus.OK).json(response);
  }
}
