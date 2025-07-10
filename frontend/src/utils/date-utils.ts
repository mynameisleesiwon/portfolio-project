/**
 * 한국어 시간 표시 유틸리티 함수들
 */

/**
 * 주어진 날짜를 "~전" 형태의 한국어로 변환
 * @param dateInput - Date 객체 또는 ISO 문자열 형태의 날짜
 * @returns 한국어 시간 표시 문자열
 */
export const koreanTimeAgo = (dateInput: Date | string): string => {
  try {
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();

    // 밀리초 단위 차이
    const diffMs = now.getTime() - date.getTime();

    // 기본 시간 단위 계산
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    // 적절한 단위로 반환
    if (diffYear > 0) {
      return `${diffYear}년 전`;
    } else if (diffMonth > 0) {
      return `${diffMonth}개월 전`;
    } else if (diffDay > 0) {
      return `${diffDay}일 전`;
    } else if (diffHour > 0) {
      return `${diffHour}시간 전`;
    } else if (diffMin > 0) {
      return `${diffMin}분 전`;
    } else {
      return '방금 전';
    }
  } catch (error) {
    console.error('날짜 포맷팅 오류:', error);
    return '날짜 정보 없음';
  }
};

/**
 * 주어진 날짜가 24시간 이내인지 확인
 * @param dateInput - Date 객체 또는 ISO 문자열 형태의 날짜
 * @returns 24시간 이내 여부
 */
export const isWithin24Hours = (dateInput: Date | string): boolean => {
  try {
    const date =
      typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours < 24;
  } catch (error) {
    console.error('날짜 계산 오류:', error);
    return false;
  }
};
