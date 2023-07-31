import { AppModule } from '@/app/app.module';
import { NestFactory } from '@nestjs/core';

const port = process.env.BACKEND_PORT ?? '3001';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
}
bootstrap();
