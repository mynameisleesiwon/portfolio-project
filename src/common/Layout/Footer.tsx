import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          © 2025 이시원 | 프론트엔드 개발자 포트폴리오
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
