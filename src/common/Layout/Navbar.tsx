import { motion } from 'framer-motion';
import { label } from 'framer-motion/client';
import { MenuIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const links = [
    { path: '/', label: '홈' },
    { path: '/tech-demo', label: '기능 모음' },
  ];
  return (
    <nav>
      {/* 모바일 메뉴 버튼 */}
      <button
        className="md:hidden p-2 cursor-pointer"
        onClick={toggleMenu}
        aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
      >
        {isMenuOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* 데스크탑 네비게이션 */}
      <div className="hidden md:flex space-x-6">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? 'text-primary font-bold'
                : 'hover:text-primary-hover transition-colors'
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-16 right-4 bg-card rounded-md shadow-lg p-4 min-w-40 z-50 md:hidden "
        >
          <div className="flex flex-col space-y-4">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-bold'
                    : 'hover:text-primary-hover transition-colors'
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
