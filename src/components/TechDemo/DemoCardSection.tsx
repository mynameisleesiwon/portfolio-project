import React from 'react';
import type { DemoCardType } from '../../types';
import { motion } from 'framer-motion';
import DemoCard from './DemoCard';

interface DemoCardSectionProps {
  demos: DemoCardType[];
  onCardClick: (demo: DemoCardType) => void;
}

const DemoCardSection = ({ demos, onCardClick }: DemoCardSectionProps) => {
  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      {demos.map((demo, index) => (
        <DemoCard key={index} demo={demo} index={index} onClick={onCardClick} />
      ))}
    </motion.div>
  );
};

export default DemoCardSection;
