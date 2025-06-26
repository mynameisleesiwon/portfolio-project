// 프로필 업데이트 요청 타입
export interface UpdateProfileRequest {
  nickname: string;
  profileImage?: string | null;
}

// 프로필 업데이트 응답 타입
export interface UpdateProfileResponse {
  message: string;
  user: {
    id: number;
    userId: string;
    nickname: string;
    profileImage?: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

// 닉네임 중복 검사 응답 타입
export interface CheckNicknameResponse {
  isAvailable: boolean;
  message: string;
}
