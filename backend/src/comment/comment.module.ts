import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentLike } from 'src/entities/comment-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, CommentLike])], // Comment 엔티티를 사용할 수 있도록 등록
  controllers: [CommentController], // HTTP 요청을 처리하는 컨트롤러
  providers: [CommentService], // 비즈니스 로직을 담당하는 서비스
  exports: [CommentService], // 다른 모듈에서 CommentService를 사용할 수 있도록 내보내기
})
export class CommentModule {}
