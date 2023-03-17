import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto } from './dto';

@Injectable({})
export class AuthService {
  login(dto: AuthDto) {
    return 'I am login';
  }
  signup(dto: AuthDto) {
    const hash = argon.hash(dto.password);
    const user = 1;
  }
}
