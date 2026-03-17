import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaLeaf, FaShieldAlt, FaHeadset, FaTag, FaPalette } from 'react-icons/fa';
import { FEATURES } from '../../utils/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaAward,
  FaLeaf,
  FaShieldAlt,
  FaHeadset,
  FaTag,
  FaPalette,
};

const WhyChooseUs: React.FC = () => {
  return (
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Why Choose UCCOPAINTS</h2>
        <p className="section-subtitle">
          Discover what makes us the preferred choice for thousands of customers
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FEATURES.map((feature, index) => {
          const IconComponent = iconMap[feature.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 text-center hover:shadow-2xl transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue/10 rounded-full mb-4">
                {IconComponent && <IconComponent className="text-3xl text-primary-blue" />}
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default WhyChooseUs;
