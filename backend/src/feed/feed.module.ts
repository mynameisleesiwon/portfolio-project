import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feed } from '../entities/feed.entity';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Feed]), // Feed 엔티티를 TypeORM에 등록
  ],
  controllers: [FeedController], // HTTP 요청을 처리하는 컨트롤러
  providers: [FeedService], // 비즈니스 로직을 담당하는 서비스
  exports: [FeedService], // 다른 모듈에서 FeedService 사용 가능하도록 export
})
export class FeedModule {}
