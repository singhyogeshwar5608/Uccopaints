import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaBuilding, FaIndustry, FaEye, FaTint, FaTools } from 'react-icons/fa';
import { SERVICES, ROUTES } from '../../utils/constants';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaHome,
  FaBuilding,
  FaIndustry,
  FaEye,
  FaTint,
  FaTools,
};

const ServicesSection: React.FC = () => {
  return (
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">
          Comprehensive painting solutions for all your needs
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => {
          const IconComponent = iconMap[service.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green/10 rounded-full mb-4 group-hover:bg-primary-green/20 transition-colors">
                {IconComponent && <IconComponent className="text-3xl text-primary-green" />}
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3 group-hover:text-primary-green transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link to={ROUTES.SERVICES} className="btn-secondary">
          View All Services
        </Link>
      </motion.div>
    </div>
  );
};

export default ServicesSection;
