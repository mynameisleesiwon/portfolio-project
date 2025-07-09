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
