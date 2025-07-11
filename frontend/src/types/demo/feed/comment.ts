// 댓글 관련 타입 정의

// 댓글 엔티티 타입
export interface Comment {
  id: string;
  content: string;
  userId: number;
  feedId: string;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: number;
    userId: string;
    nickname: string;
    profileImage: string | null;
  };
  likeCount?: number; // 좋아요 수 (선택적)
  isLiked?: boolean; // 현재 사용자가 좋아요했는지 여부 (선택적)
}

// 댓글 목록 조회 응답 타입
export interface CommentsResponse {
  message: string;
  comments: Comment[];
}

// 댓글 생성 응답 타입
export interface CreateCommentResponse {
  message: string;
  comment: Comment;
}

// 댓글 수정 응답 타입
export interface UpdateCommentResponse {
  message: string;
  comment: Comment;
}

// 댓글 삭제 응답 타입
export interface DeleteCommentResponse {
  message: string;
}

// 댓글 수 조회 응답 타입
export interface CommentCountResponse {
  message: string;
  commentCount: number;
}

// 댓글 좋아요 토글 응답 타입
export interface ToggleCommentLikeResponse {
  message: string;
  isLiked: boolean;
  likeCount: number;
}

// 댓글 좋아요 수 조회 응답 타입
export interface CommentLikeCountResponse {
  message: string;
  likeCount: number;
}
