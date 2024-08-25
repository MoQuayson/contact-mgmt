import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalPipes(new ValidationPipe());
  //await app.listen(3030, '0.0.0.0');

  const configService = app.get(ConfigService);
  const port = configService.get<string>('APP_PORT');
  const host = configService.get('APP_HOST');
  await app.listen(port, host);
}
bootstrap();
