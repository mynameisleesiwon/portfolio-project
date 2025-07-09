import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>, // Comment 엔티티의 Repository 주입
  ) {}

  // 특정 피드의 모든 댓글 조회 (사용자 정보 포함)
  async findByFeedId(feedId: string): Promise<Comment[]> {
    const comments = await this.commentRepository.find({
      where: { feedId }, // 특정 피드의 댓글만 조회
      relations: ['user'], // 사용자 정보도 함께 조회
      order: {
        createdAt: 'ASC', // 오래된 댓글부터 정렬 (시간순)
      },
    });

    return comments;
  }

  // 새로운 댓글 생성
  async create(
    content: string,
    feedId: string,
    userId: number,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      content,
      feedId,
      userId,
    });
    return this.commentRepository.save(comment);
  }

  // 단일 댓글 조회 (사용자 정보 포함)
  async findOne(id: string): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('댓글을 찾을 수 없습니다.');
    }

    return comment;
  }

  // 댓글 수정
  async update(id: string, content: string, userId: number): Promise<Comment> {
    const comment = await this.findOne(id);

    // 작성자 권한 확인
    if (comment.userId !== userId) {
      throw new ForbiddenException('댓글을 수정할 권한이 없습니다.');
    }

    // 댓글 내용 업데이트
    comment.content = content;
    return this.commentRepository.save(comment);
  }

  // 댓글 삭제
  async delete(id: string, userId: number): Promise<void> {
    const comment = await this.findOne(id);

    // 작성자 권한 확인
    if (comment.userId !== userId) {
      throw new ForbiddenException('댓글을 삭제할 권한이 없습니다.');
    }

    await this.commentRepository.remove(comment);
  }

  // 특정 피드의 댓글 수 조회
  async getCommentCount(feedId: string): Promise<number> {
    return this.commentRepository.count({
      where: { feedId },
    });
  }
}
