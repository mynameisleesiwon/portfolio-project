import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FeedService } from './feed.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('feeds') // '/feeds' 경로로 시작하는 모든 요청을 처리
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  // 모든 피드 목록 조회 API (인증 필요)
  @Get() // GET /feeds
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  async getAllFeeds(@Req() req) {
    const feeds = await this.feedService.findAll(req.user.id);

    return {
      message: '피드 목록 조회가 성공적으로 완료되었습니다.',
      feeds,
    };
  }

  // 새로운 피드 생성 API (인증 필요)
  @Post() // POST /feeds
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  @HttpCode(HttpStatus.CREATED) // 201 상태 코드 반환
  async createFeed(@Body() body: { content: string }, @Req() req) {
    const feed = await this.feedService.create(body.content, req.user.id);

    return {
      message: '피드가 성공적으로 생성되었습니다.',
      feed,
    };
  }

  // 단일 피드 조회 API (인증 필요)
  @Get(':id') // GET /feeds/:id
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  async getFeed(@Param('id') id: string, @Req() req) {
    const feed = await this.feedService.findOne(id, req.user.id);

    return {
      message: '피드 조회가 성공적으로 완료되었습니다.',
      feed,
    };
  }

  // 피드 수정 API (인증 필요)
  @Put(':id') // PUT /feeds/:id
  @UseGuards(JwtAuthGuard)
  async updateFeed(
    @Param('id') id: string,
    @Body() body: { content: string },
    @Req() req,
  ) {
    const feed = await this.feedService.update(id, body.content, req.user.id);

    return {
      message: '피드가 성공적으로 수정되었습니다.',
      feed,
    };
  }

  // 피드 삭제 API (인증 필요)
  @Delete(':id') // DELETE /feeds/:id
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT) // 204 상태 코드 반환
  async deleteFeed(@Param('id') id: string, @Req() req) {
    await this.feedService.delete(id, req.user.id);

    return {
      message: '피드가 성공적으로 삭제되었습니다.',
    };
  }

  // 좋아요 토글 API (인증 필요)
  @Post(':id/like') // POST /feeds/:id/like
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  async toggleLike(@Param('id') feedId: string, @Req() req) {
    const result = await this.feedService.toggleLike(feedId, req.user.id);

    return {
      message: result.isLiked
        ? '피드에 좋아요를 눌렀습니다.'
        : '피드 좋아요를 취소했습니다.',
      isLiked: result.isLiked,
      likeCount: result.likeCount,
    };
  }

  // 피드 좋아요 수 조회 API (인증 필요)
  @Get(':id/like-count') // GET /feeds/:id/like-count
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  async getLikeCount(@Param('id') feedId: string) {
    const likeCount = await this.feedService.getLikeCount(feedId);

    return {
      message: '좋아요 수 조회가 완료되었습니다.',
      likeCount,
    };
  }
}
