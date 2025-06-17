import { motion } from 'framer-motion';
import React from 'react';

const CareerSection = () => {
  const careers = [
    { period: '2023.03 ~ 2023.12', name: '주식회사 나으리' },
    { period: '2022.10 ~ 2022.12', name: '(주)여보야 인턴' },
    { period: '2022.07 ~ 2022.09', name: '인공지능사관학교' },
    { period: '2022.01 ~ 2022.06', name: '스마트인재개발원' },
  ];

  const projects = [
    { date: '2023.12', name: '플레이리스트' },
    { date: '2023.06', name: '요양시설비교서비스 나으리' },
    { date: '2022.12', name: '여보야' },
    { date: '2022.09', name: 'Caerulea' },
    { date: '2022.06', name: 'Senti' },
    { date: '2022.04', name: '건강하개 지켜줄개' },
  ];

  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8 border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9, duration: 0.9 }}
    >
      {/* EDUCATION & CAREER */}
      <div className="flex flex-col items-center md:items-start ">
        <h2 className="text-2xl font-bold mb-4">🎯 EDUCATION & CAREER</h2>
        <ul className="space-y-3">
          {careers.map((career, index) => (
            <li key={index} className="flex flex-col  p-2 rounded-md ">
              <span className="text-primary font-medium">{career.period}</span>
              <span>{career.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* PROJECT */}
      <div className="flex flex-col items-center md:items-start ">
        <h2 className="text-2xl font-bold mb-4">🚀 PROJECT</h2>
        <ul>
          {projects.map((project, index) => (
            <li key={index} className="flex flex-col  p-2 rounded-md ">
              <span className="text-primary font-medium">{project.date}</span>
              <span>{project.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default CareerSection;
