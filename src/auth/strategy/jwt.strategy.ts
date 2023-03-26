import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

interface Payload {
  sub: number;
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.get('IGNORE_EXPIRATION') === 'true',
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: Payload) {
    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub },
    });
    delete user.hash;

    return user;
  }
}
