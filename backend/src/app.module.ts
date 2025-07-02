import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { Feed } from './entities/feed.entity';
import { FeedModule } from './feed/feed.module';

@Module({
  imports: [
    // 환경 변수 설정 모듈
    ConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정하여 다른 모듈에서도 환경 변수 사용 가능
    }),

    // TypeORM 데이터베이스 연결 설정
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // ConfigModule을 주입받아 환경 변수 사용
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // PostgreSQL 데이터베이스 타입
        host: configService.get('DB_HOST'), // 데이터베이스 호스트
        port: configService.get('DB_PORT'), // PostgreSQL 포트
        username: configService.get('DB_USERNAME'), // 데이터베이스 사용자명
        password: configService.get('DB_PASSWORD'), // 데이터베이스 비밀번호
        database: configService.get('DB_DATABASE'), // 데이터베이스 이름
        entities: [User, Feed], // 사용할 엔티티들 (데이터베이스 테이블과 매핑)
        synchronize: configService.get('NODE_ENV') === 'development', // 개발환경에서만 테이블 자동 생성/수정
        logging: configService.get('NODE_ENV') === 'development', // 개발환경에서만 SQL 쿼리 로그 출력
      }),
      inject: [ConfigService], // ConfigService를 주입받아 환경 변수에 접근
    }),
    AuthModule, // Auth 모듈 추가
    FeedModule, // Feed 모듈 추가
  ],
  controllers: [AppController], // HTTP 요청을 처리하는 컨트롤러
  providers: [AppService], // 비즈니스 로직을 담당하는 서비스
})
export class AppModule {}
