import ProfileSection from '../components/Home/ProfileSection';
import InfoSection from '../components/Home/InfoSection';
import CareerSection from '../components/Home/CareerSection';
import SkillsSection from '../components/Home/SkillsSection';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="max-w-screen-lg mx-auto w-full px-6 py-12 space-y-16">
      <ProfileSection />
      <InfoSection />
      <SkillsSection />
      <CareerSection />
    </div>
  );
};

export default Home;
