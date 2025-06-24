import { useAuth } from '../hooks/Auth/useAuth';
import { useEffect } from 'react';

const ProtectedTest = () => {
  const { user, getProfile } = useAuth();

  // 컴포넌트 마운트 시 getProfile 테스트
  useEffect(() => {
    const testGetProfile = async () => {
      try {
        const response = await getProfile();
        console.log('✅ getProfile 성공:', response);
      } catch (error) {
        console.error('❌ getProfile 실패:', error);
      }
    };

    testGetProfile();
  }, [getProfile]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary mb-6">
        보호된 페이지 테스트
      </h1>
      <div className="bg-card p-6 rounded-lg border border-border">
        <p className="text-lg mb-4">
          🎉 이 페이지는 로그인이 필요한 페이지입니다!
        </p>
        <p className="text-muted-foreground">
          현재 로그인된 사용자:{' '}
          <span className="font-semibold">{user?.nickname}</span>
        </p>
        <p className="text-sm text-text-muted mt-4">
          💡 개발자 도구 Console에서 getProfile 테스트 결과를 확인하세요.
        </p>
      </div>
    </div>
  );
};

export default ProtectedTest;
