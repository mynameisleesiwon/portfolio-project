import axios from 'axios';
import type {
  CreateCommentResponse,
  DeleteCommentResponse,
  CommentsResponse,
  CommentCountResponse,
  UpdateCommentResponse,
} from '../types';
import { createApiClient } from '../utils/apiClient';

// 토큰이 필요한 API용 클라이언트 (모든 댓글 API에 인증 필요)
const privateCommentApi = createApiClient(
  import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3000',
  { requireAuth: true }
);

// Comment API 클래스
export const commentApiService = {
  // 특정 피드의 댓글 목록 조회 API
  async getCommentsByFeedId(feedId: string): Promise<CommentsResponse> {
    try {
      const response = await privateCommentApi.get(`/comments/feed/${feedId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            '댓글 목록 조회 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 댓글 생성 API
  async createComment(
    content: string,
    feedId: string
  ): Promise<CreateCommentResponse> {
    try {
      const response = await privateCommentApi.post('/comments', {
        content,
        feedId,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '댓글 작성 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 댓글 수정 API
  async updateComment(
    id: string,
    content: string
  ): Promise<UpdateCommentResponse> {
    try {
      const response = await privateCommentApi.put(`/comments/${id}`, {
        content,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '댓글 수정 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 댓글 삭제 API
  async deleteComment(id: string): Promise<DeleteCommentResponse> {
    try {
      const response = await privateCommentApi.delete(`/comments/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || '댓글 삭제 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },

  // 특정 피드의 댓글 수 조회 API
  async getCommentCount(feedId: string): Promise<CommentCountResponse> {
    try {
      const response = await privateCommentApi.get(
        `/comments/feed/${feedId}/count`
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message ||
            '댓글 수 조회 중 오류가 발생했습니다.'
        );
      }
      throw error;
    }
  },
};
