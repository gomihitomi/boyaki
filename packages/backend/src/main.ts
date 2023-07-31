import { AppModule } from '@/app/app.module';
import { NestFactory } from '@nestjs/core';

import * as dotenv from 'dotenv';
dotenv.config();

const port = process.env.BACKEND_PORT ?? '3001';

async function bootstrap() {
  console.log(`PORT is ${port}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
