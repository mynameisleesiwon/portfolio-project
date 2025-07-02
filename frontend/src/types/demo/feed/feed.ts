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
}

// 피드 목록 조회 응답 타입
export interface FeedsResponse {
  message: string;
  feeds: Feed[];
}

// 피드 생성 요청 타입
export interface CreateFeedRequest {
  content: string;
}

// 피드 생성 응답 타입
export interface CreateFeedResponse {
  message: string;
  feed: Feed;
}
