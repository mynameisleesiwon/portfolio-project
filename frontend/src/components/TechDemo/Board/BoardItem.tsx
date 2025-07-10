import React from 'react';
import type { Post } from '../../../types';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, User } from 'lucide-react';
import { isWithin24Hours, koreanTimeAgo } from '../../../utils/date-utils';

interface BoardItemProps {
  post: Post;
  index: number;
}

const BoardItem: React.FC<BoardItemProps> = ({ post }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // 새 게시글 표시 (24시간 이내)
  const isNew = () => {
    return isWithin24Hours(post.createdAt.toDate().toISOString());
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
