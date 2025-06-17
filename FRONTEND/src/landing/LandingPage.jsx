import React from 'react';
import HeroSection from './components/HeroSection';
import CareerLaunchpad from './components/CareerLaunchpad';
import RoadmapsSection from './components/RoadmapsSection';

// You can continue to create and import more components here
// import TestimonialsSection from './components/TestimonialsSection';
// import CoursesSection from './components/CoursesSection';

const LandingPage = () => {
  return (
    <div className="bg-gray-900">
      <HeroSection />
      <CareerLaunchpad />
      <RoadmapsSection />
      {/* Add other sections below as you build them */}
      {/* <TestimonialsSection /> */}
      {/* <CoursesSection /> */}
    </div>
  );
};

export default LandingPage;