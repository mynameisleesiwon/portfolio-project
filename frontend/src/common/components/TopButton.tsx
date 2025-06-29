import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollToTop } from '../../hooks/useScrollToTop';

const TopButton = () => {
  const { isVisible, scrollToTop } = useScrollToTop(300);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={scrollToTop}
          className="hidden md:flex fixed bottom-8 right-8 z-50 w-12 h-12 bg-primary hover:bg-primary-hover text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out items-center justify-center group"
          aria-label="맨 위로 스크롤"
          title="맨 위로 이동"
        >
          <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp
              size={20}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </motion.div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default TopButton;
