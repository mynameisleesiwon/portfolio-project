// src/components/MovieSlider/MovieCardSkeleton.tsx

const CardSkeleton = () => {
  return (
    <div
      className={`
        bg-card rounded-xl overflow-hidden shadow-md animate-pulse
         w-48 h-120 flex flex-col
      `}
    >
      {/* 포스터 스켈레톤 */}
      <div className="relative h-60 bg-skeleton-bg">
        {/* 평점 스켈레톤 */}
        <div className="absolute top-2 right-2 bg-gray-400 dark:bg-gray-600 rounded-lg w-12 h-6" />
      </div>

      {/* 정보 섹션 스켈레톤 */}
      <div className="p-4 space-y-3">
        {/* 제목 & 개봉년도 스켈레톤 */}
        <div className="space-y-2">
          <div className="h-4 bg-skeleton-bg rounded w-3/4" />
          <div className="h-4 bg-skeleton-bg rounded w-1/2" />
        </div>

        {/* 줄거리 스켈레톤 */}
        <div className="space-y-2">
          <div className="h-3 bg-skeleton-bg rounded" />
          <div className="h-3 bg-skeleton-bg rounded" />
          <div className="h-3 bg-skeleton-bg rounded" />
          <div className="h-3 bg-skeleton-bg rounded" />
          <div className="h-3 bg-skeleton-bg rounded" />
          <div className="h-3 bg-skeleton-bg rounded w-2/3" />
        </div>

        {/* 하단 정보 스켈레톤 */}
        <div className="pt-3 border-t border-skeleton-border">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-skeleton-bg rounded" />
              <div className="h-3 bg-skeleton-bg rounded w-16" />
            </div>
            <div className="h-3 bg-skeleton-bg rounded w-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
