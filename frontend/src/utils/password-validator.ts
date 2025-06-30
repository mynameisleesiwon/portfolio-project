// 비밀번호 정책 검증을 위한 유틸리티 함수 (프론트엔드용)
export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validatePassword = (
  password: string
): PasswordValidationResult => {
  const errors: string[] = [];

  // 최소 8자 이상
  if (password.length < 8) {
    errors.push('비밀번호는 최소 8자 이상이어야 합니다.');
  }

  // 최대 128자 이하
  if (password.length > 128) {
    errors.push('비밀번호는 최대 128자까지 가능합니다.');
  }

  // 소문자 1개 이상 포함
  if (!/[a-z]/.test(password)) {
    errors.push('소문자를 1개 이상 포함해야 합니다.');
  }

  // 숫자 1개 이상 포함
  if (!/\d/.test(password)) {
    errors.push('숫자를 1개 이상 포함해야 합니다.');
  }

  // 특수문자 1개 이상 포함
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('특수문자를 1개 이상 포함해야 합니다.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
