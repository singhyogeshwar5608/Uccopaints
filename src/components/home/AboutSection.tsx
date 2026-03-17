import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaBoxOpen } from 'react-icons/fa';
import { ROUTES } from '../../utils/constants';

const AboutSection: React.FC = () => {
  const stats = [
    { icon: FaAward, value: '15+', label: 'Years of Experience' },
    { icon: FaBoxOpen, value: '500+', label: 'Products' },
    { icon: FaUsers, value: '10,000+', label: 'Happy Customers' },
  ];

  return (
    <div className="container-custom">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800"
              alt="About UCCOPAINTS"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title text-left">About UCCOPAINTS</h2>
          <p className="text-gray-600 mb-4">
            UCCOPAINTS is a leading manufacturer of premium quality paints and coatings,
            committed to bringing colors to life. With over 15 years of experience in the
            industry, we have established ourselves as a trusted name in the paint manufacturing
            sector.
          </p>
          <p className="text-gray-600 mb-4">
            Our products are designed to meet the highest standards of quality, durability, and
            environmental safety. We use advanced technology and eco-friendly formulations to
            create paints that not only beautify spaces but also protect them for years to come.
          </p>
          <p className="text-gray-600 mb-8">
            From residential homes to commercial establishments and industrial facilities, our
            comprehensive range of products caters to every painting need. We take pride in our
            commitment to customer satisfaction and continuous innovation.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <stat.icon className="text-4xl text-primary-blue mx-auto mb-2" />
                <div className="text-2xl font-bold text-dark">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <Link to={ROUTES.ABOUT} className="btn-primary">
            Learn More About Us
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
