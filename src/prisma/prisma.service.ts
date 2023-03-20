import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { configService } from 'src/config/config.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: configService.getPrismaPostgresUrl(),
        },
      },
    });
  }
}
