import React from 'react';
import Hero from '../components/Hero';
import Pillars from '../components/Pillars';
import FeaturedExecutives from '../components/FeaturedExecutives';
// import Executives from '../components/Executives'; 
import FeaturedEvent from '../components/FeaturedEvent';
import CtaSection from '../components/CtaSection';

// We will add the FeaturedEvent and Cta components here later

const HomePage = () => {
  return (
    <>
      <Hero />
      <Pillars />
      <FeaturedExecutives />
      {/* <Executives /> */}
      <FeaturedEvent />
      <CtaSection />
    </>
  );
};

export default HomePage;