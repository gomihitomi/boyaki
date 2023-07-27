import { Module } from '@nestjs/common';
import { PostService } from '@post.service';
import { PrismaService } from '@prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, PrismaService, PostService],
})
export class AppModule {}
