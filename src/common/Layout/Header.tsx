import { motion } from 'framer-motion';
import Navbar from './Navbar';
import DarkModeToggle from '../../components/DarkMode/DarkModeToggle';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-10 bg-bg/80 border-b border-border backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div
          className="text-xl font-bold text-primary cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleLogo}
        >
          Siwon
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
