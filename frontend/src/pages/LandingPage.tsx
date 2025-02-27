// src/pages/LandingPage.tsx
import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FearuresCard";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#6a11cb] to-[#2575fc] min-h-screen text-white">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default LandingPage;