// 피드 관련 타입 정의

// 피드 엔티티 타입
export interface Feed {
  id: string;
  content: string;
  userId: number;
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

// 피드 목록 조회 응답 타입
export interface FeedsResponse {
  message: string;
  feeds: Feed[];
}

// 피드 생성 응답 타입
export interface CreateFeedResponse {
  message: string;
  feed: Feed;
}

// 피드 수정 응답 타입
export interface UpdateFeedResponse {
  message: string;
  feed: Feed;
}

// 피드 삭제 응답 타입
export interface DeleteFeedResponse {
  message: string;
}

// 좋아요 토글 응답 타입
export interface ToggleLikeResponse {
  message: string;
  isLiked: boolean;
  likeCount: number;
}

// 좋아요 수 조회 응답 타입
export interface LikeCountResponse {
  message: string;
  likeCount: number;
}
