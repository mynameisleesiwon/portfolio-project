import { motion } from 'framer-motion';

const ProfileSection = () => {
  return (
    <motion.section
      className="flex flex-col md:flex-row items-center gap-8 py-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 프로필 이미지 */}
      <motion.div
        className="w-40 h-40 rounded-full overflow-hidden border-4 border-border"
        whileHover={{ scale: 1.05, borderColor: 'var(--color-primary)' }}
        transition={{ duration: 0.3 }}
      >
        <img
          src="/profile.png"
          alt="이시원 프로필 사진"
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* 이름과 제목 */}
      <div className="text-center md:text-left">
        <motion.h1
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          성장하는
          <motion.span
            className="block text-4xl md:text-5xl text-primary font-bold mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            웹 개발자
          </motion.span>
          <motion.span
            className="block text-2xl md:text-3xl mt-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            이시원 입니다.
          </motion.span>
        </motion.h1>
      </div>
    </motion.section>
  );
};

export default ProfileSection;
