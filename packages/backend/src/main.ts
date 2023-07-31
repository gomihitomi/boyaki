import { AppModule } from '@/app/app.module';
import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.BACKEND_PORT ?? '3001';
  await app.listen(port);
}
bootstrap();
