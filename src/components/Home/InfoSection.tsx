import { motion } from 'framer-motion';
import { ExternalLink, Github, Mail, MapPin } from 'lucide-react';
const InfoSection = () => {
  return (
    <motion.section
      className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-border"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* 개인 정보 */}
      <div className="flex flex-col items-center md:items-start ">
        <h2 className="text-2xl font-bold mb-4">👤 이시원</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span>1995.02.19 / 광주광역시</span>
          </li>
          <li className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            <span>seoil1221@gmail.com</span>
          </li>
          <li className="flex items-center gap-2">
            <Github className="w-5 h-5 text-primary" />
            <a
              href="https://github.com/mynameisleesiwon"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors hover:text-secondary-hover"
            >
              깃허브
            </a>
          </li>
          <li className="flex items-center gap-2">
            <ExternalLink className="w-5 h-5 text-primary" />
            <a
              href="https://velog.io/@seoil1221/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors hover:text-secondary-hover"
            >
              개발 블로그
            </a>
          </li>
        </ul>
      </div>

      {/* LICENSE */}
      <div className="flex flex-col items-center md:items-start ">
        <h2 className="text-2xl font-bold mb-4">🏆 LICENSE</h2>
        <ul className="space-y-2">
          <li className="flex items-center">정보처리기사</li>
          <li className="flex items-center">컴퓨터 활용능력 1급</li>
          <li className="flex items-center">워드프로세서</li>
        </ul>
      </div>

      {/* GRADUATION */}
      <div className="flex flex-col items-center md:items-start ">
        <h2 className="text-2xl font-bold mb-4">🎓 GRADUATION</h2>
        <div className="space-y-2">
          <p>2020 전남대학교 졸업</p>
          <p>전공 : 불어불문학과</p>
          <p>부전공 : 심리학과</p>
        </div>
      </div>
    </motion.section>
  );
};

export default InfoSection;
