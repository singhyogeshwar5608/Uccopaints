import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHome, FaBuilding, FaIndustry, FaEye, FaTint, FaTools, FaPaintRoller, FaCheckCircle } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';
import { ROUTES } from '../utils/constants';

const Services: React.FC = () => {
  const services = [
    {
      icon: FaHome,
      title: 'Home Painting',
      description: 'Complete residential painting solutions for interiors and exteriors with premium finishes.',
      features: [
        'Interior wall painting',
        'Exterior facade painting',
        'Ceiling and trim work',
        'Color consultation',
        'Surface preparation',
        'Quality assurance'
      ]
    },
    {
      icon: FaBuilding,
      title: 'Commercial Projects',
      description: 'Professional painting services for offices, retail spaces, and commercial establishments.',
      features: [
        'Office buildings',
        'Retail stores',
        'Hotels and restaurants',
        'Shopping malls',
        'Healthcare facilities',
        'Educational institutions'
      ]
    },
    {
      icon: FaIndustry,
      title: 'Industrial Coatings',
      description: 'Heavy-duty paints and coatings designed for industrial applications and harsh environments.',
      features: [
        'Factory floors',
        'Machinery coating',
        'Warehouse painting',
        'Chemical resistant coatings',
        'Anti-corrosive solutions',
        'High-temperature paints'
      ]
    },
    {
      icon: FaEye,
      title: 'Color Consultation',
      description: 'Expert color advice and customization to help you choose the perfect shades for your space.',
      features: [
        'Color matching',
        'Custom tinting',
        'Mood board creation',
        'Sample testing',
        'Trend recommendations',
        'Lighting considerations'
      ]
    },
    {
      icon: FaTint,
      title: 'Waterproofing',
      description: 'Advanced waterproofing solutions to protect your property from water damage and leakage.',
      features: [
        'Roof waterproofing',
        'Basement sealing',
        'Bathroom waterproofing',
        'Terrace treatment',
        'Wall dampness solutions',
        'Crack filling'
      ]
    },
    {
      icon: FaTools,
      title: 'Surface Preparation',
      description: 'Professional wall treatment and surface preparation for optimal paint adhesion and finish.',
      features: [
        'Wall cleaning',
        'Crack repair',
        'Smoothing and leveling',
        'Primer application',
        'Old paint removal',
        'Surface inspection'
      ]
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Consultation',
      description: 'We discuss your requirements, inspect the site, and provide expert recommendations.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'Detailed project planning including color selection, material estimation, and timeline.'
    },
    {
      step: '03',
      title: 'Preparation',
      description: 'Professional surface preparation to ensure the best possible paint adhesion and finish.'
    },
    {
      step: '04',
      title: 'Execution',
      description: 'Skilled application of paints using the right techniques and tools for perfect results.'
    },
    {
      step: '05',
      title: 'Quality Check',
      description: 'Thorough inspection and touch-ups to ensure every detail meets our high standards.'
    },
  ];

  return (
    <>
      <SEOHead
        title="Our Services | UCCOPAINTS"
        description="Professional painting services including home painting, commercial projects, industrial coatings, waterproofing, and color consultation."
        keywords="painting services, home painting, commercial painting, industrial coatings, waterproofing, color consultation"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-primary-green to-primary-blue">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative container-custom h-full flex items-center justify-center text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-4">Our Services</h1>
              <p className="text-xl">Comprehensive painting solutions for all your needs</p>
            </motion.div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="section-title">What We Offer</h2>
            <p className="section-subtitle">
              Professional painting services tailored to your specific requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-2xl transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green/10 rounded-full mb-4">
                  <service.icon className="text-3xl text-primary-green" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-gray-600">
                      <FaCheckCircle className="text-primary-green mr-2 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">How We Work</h2>
              <p className="section-subtitle">
                Our proven process ensures quality results every time
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-blue text-white rounded-full text-2xl font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Services?</h2>
              <div className="space-y-4">
                {[
                  'Experienced and skilled professionals',
                  'Premium quality materials and products',
                  'Competitive pricing with no hidden costs',
                  'Timely project completion',
                  'Comprehensive warranty coverage',
                  'Excellent customer support',
                  'Eco-friendly and safe practices',
                  'Free consultation and quotation'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <FaCheckCircle className="text-primary-green text-xl mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-lg overflow-hidden shadow-xl"
            >
              <img
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800"
                alt="Professional Painting Service"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-12 text-center bg-gradient-to-r from-primary-blue to-primary-green text-white"
            >
              <FaPaintRoller className="text-6xl mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl mb-8">
                Contact us today for a free consultation and quotation
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to={ROUTES.CONTACT} className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Get Free Quote
                </Link>
                <Link to={ROUTES.PRODUCTS} className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-colors">
                  View Products
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
