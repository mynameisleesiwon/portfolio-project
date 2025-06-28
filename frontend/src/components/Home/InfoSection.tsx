import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  ExternalLink,
  Github,
  Mail,
  MapPin,
  Award,
  GraduationCap,
  User,
} from 'lucide-react';

const InfoSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 py-21 border-t border-border mb-0"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* 개인 정보 카드 */}
      <motion.div
        className="bg-card border border-border rounded-2xl p-8 shadow-primary/30 transition-all duration-300  "
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <User className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">이시원</h2>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm">1995.02.19 / 광주광역시</span>
          </li>
          <li className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary flex-shrink-0" />
            <span className="text-sm">seoil1221@gmail.com</span>
          </li>
          <li className="flex items-center gap-3">
            <Github className="w-5 h-5 text-primary flex-shrink-0" />
            <a
              href="https://github.com/mynameisleesiwon"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline transition-colors hover:text-secondary-hover"
            >
              깃허브
            </a>
          </li>
          <li className="flex items-center gap-3">
            <ExternalLink className="w-5 h-5 text-primary flex-shrink-0" />
            <a
              href="https://velog.io/@seoil1221/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline transition-colors hover:text-secondary-hover"
            >
              개발 블로그
            </a>
          </li>
        </ul>
      </motion.div>

      {/* LICENSE 카드 */}
      <motion.div
        className="bg-card border border-border rounded-2xl p-8 shadow-primary/30 transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Award className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">LICENSE</h2>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <span className="text-sm">정보처리기사</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <span className="text-sm">컴퓨터 활용능력 1급</span>
          </li>
          <li className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <span className="text-sm">워드프로세서</span>
          </li>
        </ul>
      </motion.div>

      {/* GRADUATION 카드 */}
      <motion.div
        className="bg-card border border-border rounded-2xl p-8 shadow-primary/30 transition-all duration-300"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">GRADUATION</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <span className="text-sm font-medium">2020 전남대학교 졸업</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <span className="text-sm">전공 : 불어불문학과</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <span className="text-sm">부전공 : 심리학과</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default InfoSection;
