// src/components/FeaturesSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "Subscription Tracking",
    description: "Easily track all your subscriptions in one place with detailed insights.",
    icon: "📊",
  },
  {
    title: "Smart Reminders",
    description: "Never miss a payment deadline with intelligent reminders and notifications.",
    icon: "⏰",
  },
  {
    title: "Advanced Analytics",
    description: "Gain deep insights into your spending habits with powerful analytics tools.",
    icon: "📈",
  },
];

const FeatureCard: React.FC<{ feature: Feature; index: number }> = ({ feature, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white bg-opacity-5 p-8 rounded-2xl backdrop-blur-lg border border-white border-opacity-10 hover:border-opacity-25 transition-all duration-300 group"
    >
      <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {feature.icon}
      </div>
      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
        {feature.title}
      </h3>
      <p className="text-gray-600 text-lg leading-relaxed">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#2A2A3A] to-[#1A1A2F]">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-16">
          Why Choose{" "}
          <span className="bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">
            SubLog
          </span>
          ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;