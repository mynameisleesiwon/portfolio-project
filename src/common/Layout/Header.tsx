import { motion } from 'framer-motion';
import Navbar from './Navbar';
import DarkModeToggle from '../../components/DarkMode/DarkModeToggle';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-bg/80 border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="text-xl font-bold text-primary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          이시원
        </motion.div>
        <div className="flex items-center gap-4">
          <Navbar />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
