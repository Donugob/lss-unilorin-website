import React from 'react';
import { Helmet } from 'react-helmet-async';
import lssLogo from '../assets/lss-logo.png';

const SEO = ({ 
  title, 
  description, 
  name = "LSS Unilorin", 
  type = "website", 
  image 
}) => {
  // Determine site URL dynamically based on where it's deployed
  const siteUrl = window.location.origin;
  const currentUrl = window.location.href;
  
  // Ensure image is an absolute URL
  let resolvedImage = image;
  if (!resolvedImage) {
    // Fallback to the imported logo, creating an absolute URL
    resolvedImage = `${siteUrl}${lssLogo}`;
  } else if (resolvedImage.startsWith('/')) {
    // If it's a relative path, make it absolute
    resolvedImage = `${siteUrl}${resolvedImage}`;
  }
  // If it already starts with http/https, we use it as is.
  
  // Construct a consistent title
  const formattedTitle = title ? `${title} | ${name}` : name;
  const finalDescription = description || "Welcome to the Law Students' Society, University of Ilorin.";

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{formattedTitle}</title>
      <meta name="description" content={finalDescription} />

      {/* Open Graph tags (Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={resolvedImage} />

      {/* Twitter Card tags */}
      {/* Use summary_large_image for better visibility if we have images */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={resolvedImage} />
    </Helmet>
  );
};

export default SEO;
