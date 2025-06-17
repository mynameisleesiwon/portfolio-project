import React from 'react';
import ProfileSection from '../components/Home/ProfileSection';
import InfoSection from '../components/Home/InfoSection';
import CareerSection from '../components/Home/CareerSection';
import SkillsSection from '../components/Home/SkillsSection';

const Home = () => {
  return (
    <div className="max-w-screen-lg mx-auto w-full px-4 py-6 ">
      <ProfileSection />
      <InfoSection />
      <SkillsSection />
      <CareerSection />
    </div>
  );
};

export default Home;
