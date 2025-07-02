import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Feed)
    private feedRepository: Repository<Feed>, // Feed 엔티티의 Repository 주입
  ) {}

  // 모든 피드 목록 조회 (사용자 정보 포함)
  async findAll(): Promise<Feed[]> {
    return this.feedRepository.find({
      relations: ['user'], // 사용자 정보도 함께 조회
      order: {
        createdAt: 'DESC', // 최신 피드부터 정렬
      },
    });
  }

  // 새로운 피드 생성
  async create(content: string, userId: number): Promise<Feed> {
    const feed = this.feedRepository.create({
      content,
      userId,
    });
    return this.feedRepository.save(feed);
  }
}
