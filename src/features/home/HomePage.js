// src/features/home/HomePage.js
import React from "react";
import { Box } from "@mui/material";
import HeroSection from "./components/HeroSection";
import HomeSearchBar from "./components/HomeSearchBar";
import FeaturedProperties from "./components/FeaturedProperties";
import HomeMapPreview from "./components/HomeMapPreview";
import CallToAction from "./components/CallToAction";

/**
 * HomePage Component
 *
 * Acts as the main container for the home page, arranging different sections.
 * It imports and renders specialized section components.
 * Uses CSS classes defined in HomePage.css for all spacing, backgrounds, and responsive behavior.
 */
const HomePage = () => {
  return (
    <Box className="home-page">
      {/* Hero Section: gradient background, headline, subtitle, and CTA buttons */}
      <Box className="section hero-section">
        <HeroSection />
      </Box>

      {/* Search Bar Section: overlays hero, includes search inputs and map dialog toggle */}
      <Box className="section search-bar-section">
        <HomeSearchBar />
      </Box>

      {/* Featured Properties Section: handpicked property cards in a responsive grid */}
      <Box className="section featured-properties-section">
        <FeaturedProperties />
      </Box>

      {/* Map Preview Section: mini-map with sample pins and 'Open Full Map' button */}
      <Box className="section map-preview-section">
        <HomeMapPreview />
      </Box>

      {/* Call To Action Section: final prompt encouraging users to contact */}
      <Box className="section cta-section">
        <CallToAction />
      </Box>
    </Box>
  );
};

export default HomePage;
