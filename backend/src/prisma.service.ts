import {
  Injectable,
  Logger,
  OnApplicationShutdown,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnApplicationShutdown
{
  async onModuleInit() {
    Logger.log('prisma connect');
    await this.$connect();
  }
  async onApplicationShutdown() {
    Logger.log('prisma disconnect');
    await this.$disconnect();
  }
}
