import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const ProfileSection = () => {
  // "Keep Going" 텍스트를 글자별로 분리
  const keepGoingText = 'Keep Going'.split('');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.section
      className="relative py-20 mb-21"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* 카드 배경 */}
      <div className="absolute inset-0 bg-card border border-border rounded-3xl p-6 shadow-primary/30 transition-all duration-300" />

      {/* 메인 컨테이너 */}
      <div className="relative max-w-4xl mx-auto">
        {/* 프로필 이미지와 이름 */}
        <div className="flex flex-col items-center text-center">
          {/* 프로필 이미지 */}
          <motion.div
            className={`w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden border-4 shadow-2xl mb-8 transition-colors relative ${
              isHovered ? 'border-primary' : 'border-border'
            }`}
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* 기본 이미지 */}
            <motion.img
              src="/profile.png"
              alt="이시원 프로필 사진"
              className="w-full h-full object-cover absolute inset-0"
              animate={{
                opacity: isHovered ? 0 : 1,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            />

            {/* 호버 이미지 */}
            <motion.img
              src="/profile2.png"
              alt="이시원 프로필 사진 (호버)"
              className="w-full h-full object-cover absolute inset-0"
              animate={{
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* Keep Going 메인 타이틀 */}
          <motion.div
            className="mb-6 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold relative"
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {keepGoingText.map((letter, index) => (
                <motion.span
                  key={index}
                  className="inline-block text-primary"
                  initial={{ opacity: 0, y: 20, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 100,
                  }}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}

              {/* 불 이모티콘 */}
              <motion.span
                className="absolute -right-16 top-0 text-4xl md:text-6xl"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{
                  opacity: isHovered ? 1 : 0,
                  scale: isHovered ? 1 : 0,
                  rotate: isHovered ? 0 : -180,
                }}
                transition={{
                  duration: 0.4,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                🔥
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* 서브 타이틀 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.h2 className="text-2xl md:text-3xl text-text-muted mb-2">
              웹 개발자
            </motion.h2>
            <motion.h3 className="text-3xl md:text-4xl text-text font-bold">
              이시원
            </motion.h3>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ProfileSection;
