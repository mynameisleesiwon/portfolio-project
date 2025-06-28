import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiGithub,
  SiClaude,
  SiAngular,
  SiNestjs,
  SiPostgresql,
} from 'react-icons/si';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { JSPIcon } from '../Icons';
import { Cpu, Code, Database, Wrench } from 'lucide-react';

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      name: 'Frontend',
      icon: <Code className="w-5 h-5 text-primary" />,
      color: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      skills: [
        { icon: <SiHtml5 className="text-orange-500" />, name: 'HTML5' },
        { icon: <SiCss3 className="text-blue-500" />, name: 'CSS3' },
        {
          icon: <SiJavascript className="text-yellow-400" />,
          name: 'JavaScript',
        },
        {
          icon: <SiTypescript className="text-blue-600" />,
          name: 'TypeScript',
        },
        { icon: <SiReact className="text-cyan-400" />, name: 'React' },
        { icon: <SiAngular className="text-red-600" />, name: 'Angular' },
        {
          icon: <SiNextdotjs className="text-black dark:text-white" />,
          name: 'Next.js',
        },
      ],
    },
    {
      name: 'Backend',
      icon: <Database className="w-5 h-5 text-primary" />,
      color: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      skills: [
        { icon: <SiNestjs className="text-red-500" />, name: 'NestJS' },
        {
          icon: <SiPostgresql className="text-blue-700" />,
          name: 'PostgreSQL',
        },
        { icon: <JSPIcon />, name: 'JSP' },
      ],
    },
    {
      name: 'Tools',
      icon: <Wrench className="w-5 h-5 text-primary" />,
      color: 'from-primary/10 to-primary/5',
      borderColor: 'border-primary/20',
      skills: [
        {
          icon: <SiGithub className="text-gray-800 dark:text-white" />,
          name: 'GitHub',
        },
        { icon: <SiClaude className="text-orange-500" />, name: 'Claude' },
      ],
    },
  ];

  return (
    <motion.section
      ref={ref}
      className="py-21 border-t border-border mb-0"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <motion.div
        className="bg-card border border-border rounded-2xl p-8 shadow-primary/30 transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Cpu className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">SKILLS</h2>
          </div>

          <div className="w-full space-y-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.name}
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.5,
                  delay: 0.2 + categoryIndex * 0.1,
                  ease: 'easeOut',
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 bg-gradient-to-r ${category.color} border ${category.borderColor} rounded-lg`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {category.skills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="group relative"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={
                        isInView
                          ? { opacity: 1, scale: 1 }
                          : { opacity: 0, scale: 0.8 }
                      }
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className={`
                        relative bg-card/50 
                        border border-border rounded-xl p-4 
                        transition-all 
                        group-hover:bg-card
                        group-hover:border-primary/20
                     
                      `}
                      >
                        <div className="flex flex-col items-center text-center">
                          <div className="w-12 h-12 mb-3 text-3xl flex items-center justify-center">
                            {skill.icon}
                          </div>
                          <span className="text-sm font-medium">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default SkillsSection;
