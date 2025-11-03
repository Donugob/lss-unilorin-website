import React from 'react';
import { Helmet } from 'react-helmet-async';
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
    <Helmet>
        <title>Law Students' Society, University of Ilorin | Official Hub</title>
        <meta name="description" content="The official digital hub for the Law Students' Society (LSS), University of Ilorin. Access news, events, academic materials, and connect with the LSS leadership." />
        <link rel="canonical" href="https://www.lssunilawrin.com" />

        {/* --- Open Graph Tags (for social media sharing) --- */}
        <meta property="og:title" content="Law Students' Society, University of Ilorin | Official Hub" />
        <meta property="og:description" content="The central hub for news, events, and resources for law students at UNILORIN." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.lssunilawrin.com" />
        <meta property="og:image" content="https://i.postimg.cc/SQTVn92z/Whats-App-Image-2025-10-04-at-07-25-48-8257343e.jpg" /> {/* We'll create this image */}

        {/* --- Twitter Card Tags --- */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Law Students' Society, University of Ilorin | Official Hub" />
        <meta name="twitter:description" content="The central hub for news, events, and resources for law students at UNILORIN." />
        <meta name="twitter:image" content="https://i.postimg.cc/SQTVn92z/Whats-App-Image-2025-10-04-at-07-25-48-8257343e.jpg" />
      </Helmet>
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