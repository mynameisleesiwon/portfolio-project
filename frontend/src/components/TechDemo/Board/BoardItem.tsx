import React from 'react';
import type { Post } from '../../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, User } from 'lucide-react';

interface BoardItemProps {
  post: Post;
  index: number;
}

const BoardItem: React.FC<BoardItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 날짜 포맷팅
  const koreanTimeAgo = (dateString: string): string => {
    try {
      const date = new Date(dateString);
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

  // 새 게시글 표시 (24시간 이내)
  const isNew = () => {
    const date = new Date(post.createdAt.toDate().toISOString());
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours < 24;
  };

  // 게시글 클릭 핸들러
  const handleClick = () => {
    const currentSearch = location.search;
    const targetUrl = `/tech-demo/board/${post.id}${currentSearch}`;

    navigate(targetUrl);
  };

  return (
    <div
      className="border-b border-border hover:bg-card-hover/30 transition-colors cursor-pointer"
      onClick={handleClick}
    >
      <div className="px-3 py-3">
        {/* 제목 줄 */}
        <div className="flex items-center gap-2">
          {/* 카테고리 */}
          <span className="px-2 py-0.5 text-xs font-medium rounded-full border border-border bg-card text-text-muted">
            {post.category}
          </span>
          <div className="flex items-center">
            <h3 className="text-base font-medium text-text  mr-2">
              {post.title}
            </h3>

            {/* New 표시 */}
            {isNew() && (
              <span className="text-xs text-accent ml-2 font-medium">NEW</span>
            )}
          </div>
        </div>

        {/* 메타 정보 줄 */}
        <div className="flex items-center text-text-muted/70 gap-1 text-sm">
          {/* 작성자 */}
          <div className="flex items-center font-medium">
            <User size={14} className="mr-1" />
            <span> {post.author}</span>
          </div>

          {/* 구분점 */}
          <div className=" text-border">•</div>

          {/* 작성 시간 */}
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>{koreanTimeAgo(post.createdAt.toDate().toISOString())}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
