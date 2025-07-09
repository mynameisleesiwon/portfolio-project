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
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments') // '/comments' 경로로 시작하는 모든 요청을 처리
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 특정 피드의 댓글 목록 조회 API (인증 필요)
  @Get('feed/:feedId') // GET /comments/feed/:feedId
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  async getCommentsByFeedId(@Param('feedId') feedId: string) {
    const comments = await this.commentService.findByFeedId(feedId);

    return {
      message: '댓글 목록 조회가 성공적으로 완료되었습니다.',
      comments,
    };
  }

  // 새로운 댓글 생성 API (인증 필요)
  @Post() // POST /comments
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  @HttpCode(HttpStatus.CREATED) // 201 상태 코드 반환
  async createComment(
    @Body() body: { content: string; feedId: string },
    @Req() req,
  ) {
    const comment = await this.commentService.create(
      body.content,
      body.feedId,
      req.user.id,
    );

    return {
      message: '댓글이 성공적으로 생성되었습니다.',
      comment,
    };
  }

  // 단일 댓글 조회 API (인증 필요)
  @Get(':id') // GET /comments/:id
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  async getComment(@Param('id') id: string) {
    const comment = await this.commentService.findOne(id);

    return {
      message: '댓글 조회가 성공적으로 완료되었습니다.',
      comment,
    };
  }

  // 댓글 수정 API (인증 필요)
  @Put(':id') // PUT /comments/:id
  @UseGuards(JwtAuthGuard)
  async updateComment(
    @Param('id') id: string,
    @Body() body: { content: string },
    @Req() req,
  ) {
    const comment = await this.commentService.update(
      id,
      body.content,
      req.user.id,
    );

    return {
      message: '댓글이 성공적으로 수정되었습니다.',
      comment,
    };
  }

  // 댓글 삭제 API (인증 필요)
  @Delete(':id') // DELETE /comments/:id
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT) // 204 상태 코드 반환
  async deleteComment(@Param('id') id: string, @Req() req) {
    await this.commentService.delete(id, req.user.id);

    return {
      message: '댓글이 성공적으로 삭제되었습니다.',
    };
  }

  // 특정 피드의 댓글 수 조회 API (인증 필요)
  @Get('feed/:feedId/count') // GET /comments/feed/:feedId/count
  @UseGuards(JwtAuthGuard) // JWT 토큰 검증
  async getCommentCount(@Param('feedId') feedId: string) {
    const commentCount = await this.commentService.getCommentCount(feedId);

    return {
      message: '댓글 수 조회가 완료되었습니다.',
      commentCount,
    };
  }
}
