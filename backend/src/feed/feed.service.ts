import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';
import { FeedLike } from 'src/entities/feed-like.entity';
import { CommentService } from 'src/comment/comment.service';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>, // Feed 엔티티의 Repository 주입
    @InjectRepository(FeedLike)
    private feedLikeRepository: Repository<FeedLike>, // FeedLike 엔티티의 Repository 주입
    private commentService: CommentService, // CommentService 주입
  ) {}

  // 모든 피드 목록 조회 (사용자 정보 및 좋아요 정보 포함)
  async findAll(userId: number): Promise<Feed[]> {
    const feeds = await this.feedRepository.find({
      relations: ['user'], // 사용자 정보도 함께 조회
      order: {
        createdAt: 'DESC', // 최신 피드부터 정렬
      },
    });

    // 각 피드에 좋아요 수와 현재 사용자의 좋아요 상태 추가
    const feedsWithLikes = await Promise.all(
      feeds.map(async (feed) => {
        const likeCount = await this.getLikeCount(feed.id);
        const isLiked = await this.isLikedByUser(feed.id, userId);
        const commentCount = await this.commentService.getCommentCount(feed.id); // 댓글 수 추가

        return {
          ...feed,
          likeCount,
          isLiked,
          commentCount, // 댓글 수 추가
        };
      }),
    );

    return feedsWithLikes;
  }

  // 새로운 피드 생성
  async create(content: string, userId: number): Promise<Feed> {
    const feed = this.feedRepository.create({
      content,
      userId,
    });
    return this.feedRepository.save(feed);
  }

  // 단일 피드 조회 (사용자 정보 및 좋아요 정보 포함)
  async findOne(id: string, userId: number): Promise<Feed> {
    const feed = await this.feedRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!feed) {
      throw new NotFoundException('피드를 찾을 수 없습니다.');
    }

    // 좋아요 수와 현재 사용자의 좋아요 상태 추가
    const likeCount = await this.getLikeCount(feed.id);
    const isLiked = await this.isLikedByUser(feed.id, userId);

    return {
      ...feed,
      likeCount,
      isLiked,
    };
  }

  // 피드 수정
  async update(id: string, content: string, userId: number): Promise<Feed> {
    const feed = await this.findOne(id, userId);

    // 작성자 권한 확인
    if (feed.userId !== userId) {
      throw new ForbiddenException('피드를 수정할 권한이 없습니다.');
    }

    // 피드 내용 업데이트
    feed.content = content;
    return this.feedRepository.save(feed);
  }

  // 피드 삭제
  async delete(id: string, userId: number): Promise<void> {
    const feed = await this.findOne(id, userId);

    // 작성자 권한 확인
    if (feed.userId !== userId) {
      throw new ForbiddenException('피드를 삭제할 권한이 없습니다.');
    }

    await this.feedRepository.remove(feed);
  }

  // 좋아요 토글 (좋아요 추가/제거)
  async toggleLike(
    feedId: string,
    userId: number,
  ): Promise<{ isLiked: boolean; likeCount: number }> {
    // 기존 좋아요 확인
    const existingLike = await this.feedLikeRepository.findOne({
      where: { feedId, userId },
    });

    if (existingLike) {
      // 좋아요가 있으면 제거
      await this.feedLikeRepository.remove(existingLike);
      const likeCount = await this.getLikeCount(feedId);
      return { isLiked: false, likeCount };
    } else {
      // 좋아요가 없으면 추가
      const newLike = this.feedLikeRepository.create({
        feedId,
        userId,
      });
      await this.feedLikeRepository.save(newLike);
      const likeCount = await this.getLikeCount(feedId);
      return { isLiked: true, likeCount };
    }
  }

  // 특정 피드의 좋아요 수 조회
  async getLikeCount(feedId: string): Promise<number> {
    return this.feedLikeRepository.count({
      where: { feedId },
    });
  }

  // 특정 사용자가 특정 피드에 좋아요했는지 확인
  async isLikedByUser(feedId: string, userId: number): Promise<boolean> {
    const like = await this.feedLikeRepository.findOne({
      where: { feedId, userId },
    });
    return !!like;
  }
}
