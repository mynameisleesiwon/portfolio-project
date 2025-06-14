import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePostDetail } from '../../../hooks/Board/usePostDetail';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Clock, User } from 'lucide-react';

const BoardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // 게시글 상세 정보 관리
  const { post, error, refetch, deletePost, isLoading } = usePostDetail(
    id || ''
  );

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error('날짜 포맷팅 오류:', error);
      return '날짜 정보 없음';
    }
  };

  // 목록으로 돌아가기
  const handleGoBack = () => {
    const targetUrl = location.search
      ? `/tech-demo/board${location.search}`
      : '/tech-demo/board';

    navigate(targetUrl);
  };

  // 수정 페이지로 이동
  const handleEdit = () => {
    if (post) {
      const targetUrl = location.search
        ? `/tech-demo/board/edit/${post.id}/${location.search}`
        : `/tech-demo/board/edit/${post.id}`;

      navigate(targetUrl);
    }
  };

  // 게시글 삭제
  const handleDelete = async () => {
    if (!post) return;

    const isConfirmed = window.confirm(
      '게시글을 정말 삭제하시겠습니까?\n\n삭제된 게시글은 복구할 수 없습니다.'
    );

    if (isConfirmed) {
      const success = await deletePost();
      if (success) {
        alert('게시글이 삭제되었습니다.');
        navigate('/tech-demo/board');
      }
    }
  };

  // 에러 표시
  if (error) {
    return (
      <ErrorMessage
        title="게시글을 불러올 수 없습니다"
        message={error}
        onRetry={refetch}
      />
    );
  }

  // 게시글이 없는 경우
  if (!post) {
    return;
  }

  return (
    <div className="w-full my-6 px-2 max-w-screen-lg mx-auto">
      {/* 메인 */}
      <div className="bg-card rounded-lg border border-border overflow-hidden ">
        {/* 헤더 영역 */}
        <div className="p-6 border-b border-border">
          {/* 카테고리 배지 */}
          {post.category && (
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                {post.category}
              </span>
            </div>
          )}

          {/* 제목 */}
          <h1 className="text-2xl font-bold text-text mb-4 leading-tight break-words">
            {post.title}
          </h1>

          {/* 메타 정보 */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            {/* 작성자 */}
            <div className="flex items-center">
              <User size={16} className="mr-2 text-primary" />
              <span>{post.author}</span>
            </div>

            {/* 작성일 */}
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-primary" />
              <span>{formatDate(post.createdAt.toDate().toISOString())}</span>
            </div>
          </div>
        </div>

        {/* 본문 영역 */}
        <div className="p-6">
          <div className="max-w-none">
            <div
              className="text-text leading-relaxed whitespace-pre-wrap break-words text-base"
              style={{
                lineHeight: '1.8',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {post.content}
            </div>
          </div>
        </div>

        {/* 하단 액션 바 */}
        <div className="p-6 border-t border-border bg-card-hover/30">
          <div className="flex justify-between items-center">
            {/* 왼쪽: 목록 버튼 */}
            <button
              onClick={handleGoBack}
              className="inline-flex items-center px-4 py-2 text-text-muted hover:text-text border border-border rounded-lg hover:bg-card-hover transition-all duration-200 cursor-pointer"
            >
              목록
            </button>

            {/* 오른쪽: 관리 버튼들 */}
            <div className="flex gap-2">
              {/* 수정 버튼 */}
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 text-text-muted hover:text-text border border-border rounded-lg hover:bg-card-hover transition-all duration-200 cursor-pointer"
              >
                수정
              </button>

              {/* 삭제 버튼 */}
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 text-text-muted hover:text-text border border-border rounded-lg hover:bg-card-hover transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 본문 영역 */}
    </div>
  );
};

export default BoardDetail;
