import { useAuth } from '../hooks/Auth/useAuth';

const ProtectedTest = () => {
  const { user } = useAuth();

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
      </div>
    </div>
  );
};

export default ProtectedTest;
