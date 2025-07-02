import { Controller, Get } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feeds') // '/feeds' 경로로 시작하는 모든 요청을 처리
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  // 모든 피드 목록 조회 API
  @Get() // GET /feeds
  async getAllFeeds() {
    const feeds = await this.feedService.findAll();

    return {
      message: '피드 목록 조회가 성공적으로 완료되었습니다.',
      feeds,
    };
  }
}
