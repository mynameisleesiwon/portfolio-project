import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; // 추가
import { join } from 'path'; // 추가
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  // NestExpressApplication 타입으로 앱 생성
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 쿠키 파서 미들웨어 추가
  app.use(cookieParser());

  // CORS 설정
  app.enableCors({
    origin: ['http://localhost:5173', 'https://siwonsportfolio.netlify.app'],
    credentials: true,
  });

  // 개발 환경에서만 uploads 폴더 정적 서빙
  if (process.env.NODE_ENV === 'development') {
    app.useStaticAssets(join(process.cwd(), 'uploads'), {
      prefix: '/uploads/',
    });
  }

  // ValidationPipe 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
