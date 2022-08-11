import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setean en todas las api de las rutas un pefijo antes
  app.setGlobalPrefix('/api/v2');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // transforma esa informacion q fluye por los DTOs
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );
  await app.listen(3000);
}
bootstrap();
