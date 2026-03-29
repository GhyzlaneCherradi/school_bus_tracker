import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enables global validation using the class-validator decorators defined in dto
  app.useGlobalPipes(
    new ValidationPipe({ 
      whitelist: true, //Supprime les champs non définis dans le DTO
      transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();