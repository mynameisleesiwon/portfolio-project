import type { DemoCardType } from '../../types';
import { motion } from 'framer-motion';
import { ArrowRightIcon, PlayIcon } from 'lucide-react';

interface DemoCardProps {
  demo: DemoCardType;
  index: number;
  onClick: (demo: DemoCardType) => void;
}

const DemoCard = ({ demo, index, onClick }: DemoCardProps) => {
  // 상태별 색상 정의
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'coming-soon':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className={`bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col ${
        demo.status === 'active'
          ? 'cursor-pointer hover:border-primary hover:-translate-y-1'
          : 'cursor-not-allowed'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: demo.status === 'active' ? 1 : 0.6,
        y: 0,
      }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      onClick={() => onClick(demo)}
      whileHover={demo.status === 'active' ? { scale: 1.02 } : {}}
    >
      {/* 메인 콘텐츠 영역 */}
      <div className="flex-1 flex flex-col justify-between">
        {/* 카드 헤더 */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-primary">{demo.icon}</div>
              <div>
                <h3 className="text-xl font-bold text-text">{demo.title}</h3>
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  demo.status
                )}`}
              >
                {demo.status === 'active' ? '활성' : '준비중'}
              </span>
            </div>
          </div>

          <p className="text-text/70 mb-4 leading-relaxed">
            {demo.description}
          </p>
          <div className="text-sm text-text/60 mb-4 leading-relaxed">
            {demo.detailDescription}
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="px-6 pb-4">
          <h4 className="text-sm font-semibold text-text mb-2">주요 기능</h4>
          <div className="grid grid-cols-1 gap-1">
            {demo.features.map((feature, idx) => (
              <div key={idx} className="flex items-center text-xs text-text/60">
                <div className="w-1 h-1 bg-primary rounded-full mr-2"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 카드 푸터 */}
      <div className="bg-border/20 px-6 py-4 mt-auto">
        <div className="flex items-center justify-start">
          {demo.status === 'active' ? (
            <div className="flex items-center text-primary text-sm font-medium">
              <PlayIcon className="w-4 h-4 mr-1" />
              체험하기
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </div>
          ) : (
            <div className="text-text/40 text-sm">곧 공개 예정</div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DemoCard;
