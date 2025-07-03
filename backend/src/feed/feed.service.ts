import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  // 단일 피드 조회 (사용자 정보 포함)
  async findOne(id: string): Promise<Feed> {
    const feed = await this.feedRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!feed) {
      throw new NotFoundException('피드를 찾을 수 없습니다.');
    }

    return feed;
  }

  // 피드 수정
  async update(id: string, content: string, userId: number): Promise<Feed> {
    const feed = await this.findOne(id);

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
    const feed = await this.findOne(id);

    // 작성자 권한 확인
    if (feed.userId !== userId) {
      throw new ForbiddenException('피드를 삭제할 권한이 없습니다.');
    }

    await this.feedRepository.remove(feed);
  }
}
