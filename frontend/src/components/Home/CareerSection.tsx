import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Building2, FolderOpen, Download } from 'lucide-react';

const CareerSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const careers = [
    {
      date: '2024.05 ~ 2024.08',
      name: '주식회사 웨이소프트',
      description: '웹 개발자',
    },
    {
      date: '2023.03 ~ 2023.12',
      name: '주식회사 나으리',
      description: '웹 프론트엔드 개발자',
    },
    {
      date: '2022.10 ~ 2022.12',
      name: '(주)여보야',
      description: '웹 개발자',
    },
    {
      date: '2022.07 ~ 2022.09',
      name: '인공지능사관학교',
      description: '인공지능사관학교 JS_A반',
    },
    {
      date: '2022.01 ~ 2022.06',
      name: '스마트인재개발원',
      description: '빅데이터 분석서비스 개발자과정',
    },
  ];

  const projects = [
    {
      date: '2023.12',
      name: '플레이리스트',
      description: '주변 놀거리 찾기 서비스',
    },
    {
      date: '2023.06',
      name: '나으리',
      description: '요양시설 비교 서비스',
    },
    {
      date: '2022.12',
      name: '여보야',
      description: '커뮤니티 • 사고팔고 서비스 마이페이지 리뉴얼',
    },
    {
      date: '2022.09',
      name: 'Caerulea',
      description: '꽃다발 주문 제작 사이트',
    },
    {
      date: '2022.06',
      name: 'Senti',
      description: '사용자 음역대 분석을 통한 노래 추천/노래방 서비스',
    },
    {
      date: '2022.04',
      name: '건강하개 지켜줄개',
      description: '반려견 관련 건강 정보 사이트',
    },
  ];

  const categories = [
    {
      title: 'CAREER & EDUCATION',
      icon: <Building2 className="w-5 h-5 text-primary" />,
      color: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      items: careers,
      type: 'career',
    },
    {
      title: 'PROJECTS',
      icon: <FolderOpen className="w-5 h-5 text-primary" />,
      color: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      items: projects,
      type: 'project',
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-21 border-t border-border mb-0"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="bg-card border border-border rounded-2xl p-8 shadow-primary/30 transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center">
          <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.title}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + categoryIndex * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`p-2 bg-gradient-to-r ${category.color} border ${category.borderColor} rounded-lg`}
                    >
                      {category.icon}
                    </div>
                    <h3 className="text-2xl font-semibold">{category.title}</h3>
                    {category.type === 'project' && (
                      <div className="relative group">
                        <button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = '/portfolio.pdf'; // PDF 파일 경로
                            link.download = '포트폴리오_이시원_웹개발자.pdf';
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          }}
                          className="p-2 bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors duration-200"
                          title="포트폴리오 PDF 다운로드"
                        >
                          <Download className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
                        </button>
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-card border border-border text-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10 shadow-lg">
                          프로젝트 포트폴리오 다운로드
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-border"></div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={itemIndex}
                        className="group relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          isInView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                        }
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div
                          className={`
                          relative bg-card/50 
                          border border-border rounded-xl p-4 
                          transition-all duration-150 ease-in-out
                          group-hover:bg-card
                          group-hover:border-primary/20
                          transform-gpu
                        `}
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-primary">
                                {item.date}
                              </span>
                            </div>
                            <h4 className="font-semibold text-base text-foreground">
                              {item.name}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default CareerSection;
