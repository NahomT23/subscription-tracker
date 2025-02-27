import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleNavigation = () => {
    navigate(isLoggedIn ? "/dashboard" : "/signup");
  };

  return (
    <div className="relative py-32 bg-gradient-to-br from-[#2A2A3A] to-[#1A1A2F] overflow-hidden">
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
              SubLog
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
            Take control of your subscriptions with our intelligent tracking and management platform
          </p>

          {/* Single button here */}
          <button
            onClick={handleNavigation}
            className="z-10 inline-block bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoggedIn ? "Go to Dashboard →" : "Get Started →"}
          </button>
        </div>
      </motion.section>

      {/* Animated background elements, pointer-events disabled */}
      <div className="pointer-events-none absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute w-72 h-72 bg-[#FF6B6B] rounded-full blur-3xl opacity-20 -top-32 -left-32" />
        <div className="absolute w-72 h-72 bg-[#FF8E53] rounded-full blur-3xl opacity-20 -bottom-32 -right-32" />
      </div>
    </div>
  );
};

export default HeroSection;
