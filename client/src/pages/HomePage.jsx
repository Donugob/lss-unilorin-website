import React from 'react';
import SEO from '../components/SEO';
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
      <SEO
        title="Official Hub"
        description="The official digital hub for the Law Students' Society (LSS), University of Ilorin. Access news, events, academic materials, and connect with the LSS leadership."
      />
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