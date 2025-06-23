import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiGithub,
  SiClaude,
} from 'react-icons/si';

import { motion } from 'framer-motion';
import { JSPIcon } from '../Icons';

const SkillsSection = () => {
  const skills = [
    {
      icon: <SiHtml5 className="text-orange-500" />,
      name: 'HTML5',
    },
    {
      icon: <SiCss3 className="text-blue-500" />,
      name: 'CSS3',
    },
    {
      icon: <SiJavascript className="text-yellow-400" />,
      name: 'JavaScript',
    },
    {
      icon: <SiTypescript className="text-blue-600" />,
      name: 'TypeScript',
    },
    {
      icon: <SiReact className="text-cyan-400" />,
      name: 'React',
    },
    {
      icon: <SiNextdotjs className="text-black dark:text-white" />,
      name: 'Next.js',
    },
    {
      icon: <JSPIcon />,
      name: 'JSP',
    },
    {
      icon: <SiGithub className="text-gray-800 dark:text-white" />,
      name: 'GitHub',
    },
    {
      icon: <SiClaude className="text-orange-500" />,
      name: 'Claude',
    },
  ];

  return (
    <motion.section
      className="grid grid-cols-1 gap-8 py-8 border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
    >
      <div className="flex flex-col items-center md:items-start ">
        <h2 className="text-2xl font-bold mb-4">💪 SKILL</h2>
        <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-6 gap-6 w-full">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 mb-3 p-2 text-5xl">{skill.icon}</div>
              <span className="text-sm">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
