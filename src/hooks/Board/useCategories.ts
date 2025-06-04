import { useEffect, useState } from 'react';
import type { Category } from '../../types';
import { boardApi } from '../../services/boardApi';

interface UseCategoriesReturn {
  // 데이터
  categories: Category[];

  // 상태
  error: string | null;

  // 액션
  refetch: () => void;
}

export const useCategories = (): UseCategoriesReturn => {
  // 상태 관리
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 카테고리 가져오기 함수
  const fetchCategories = async () => {
    try {
      setError(null);

      // 실제 API 호출
      const result = await boardApi.getCategories();

      setCategories(result);
    } catch (error) {
      setError('카테고리를 불러오는데 실패했습니다.');
      setCategories([]);
    }
  };

  // 컴포넌트 마운트 시 한 번만 실행
  useEffect(() => {
    fetchCategories();
  }, []);

  // 컴포넌트에서 사용할 것들 반환
  return {
    // 데이터
    categories,

    // 상태
    error,

    // 액션
    refetch: fetchCategories,
  };
};
