import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup() {
    return 'Im signup';
  }

  @Post('login')
  login() {
    return 'Im login';
  }
}
