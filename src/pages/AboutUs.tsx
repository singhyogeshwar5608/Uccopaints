import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaBoxOpen, FaEye, FaBullseye, FaHeart } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';

const AboutUs: React.FC = () => {
  const stats = [
    { icon: FaAward, value: '15+', label: 'Years of Experience' },
    { icon: FaBoxOpen, value: '500+', label: 'Products' },
    { icon: FaUsers, value: '10,000+', label: 'Happy Customers' },
    { icon: FaAward, value: '50+', label: 'Awards Won' },
  ];

  const values = [
    {
      icon: FaAward,
      title: 'Quality Excellence',
      description: 'We never compromise on quality. Every product undergoes rigorous testing to ensure it meets the highest standards.'
    },
    {
      icon: FaHeart,
      title: 'Customer First',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations in every interaction.'
    },
    {
      icon: FaEye,
      title: 'Innovation',
      description: 'We continuously invest in research and development to bring cutting-edge paint solutions to market.'
    },
    {
      icon: FaBullseye,
      title: 'Sustainability',
      description: 'Environmental responsibility is core to our operations. We create eco-friendly products that protect our planet.'
    },
  ];

  return (
    <>
      <SEOHead
        title="About Us | UCCOPAINTS"
        description="Learn about UCCOPAINTS - a leading manufacturer of premium quality paints with over 15 years of experience in the industry."
        keywords="about uccopaints, paint company, paint manufacturer, company history"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <div className="relative h-96 bg-gradient-to-r from-primary-blue to-primary-green">
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="relative container-custom h-full flex items-center justify-center text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl font-bold mb-4">About UCCOPAINTS</h1>
              <p className="text-xl">Bringing Colors to Life Since 2009</p>
            </motion.div>
          </div>
        </div>

        {/* Company Story */}
        <div className="container-custom py-16">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">Our Story</h2>
              <p className="section-subtitle">A journey of colors, quality, and commitment</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8 mb-12"
            >
              <p className="text-gray-600 text-lg mb-4">
                Founded in 2009, UCCOPAINTS has grown from a small local paint manufacturer to one of the most
                trusted names in the industry. Our journey began with a simple vision: to provide high-quality,
                affordable paints that transform spaces and inspire creativity.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                Over the years, we have expanded our product range to include interior emulsions, exterior paints,
                wood finishes, waterproofing solutions, and specialty coatings. Each product is crafted with
                precision, using advanced technology and eco-friendly formulations.
              </p>
              <p className="text-gray-600 text-lg">
                Today, UCCOPAINTS serves thousands of customers across the country, from homeowners and contractors
                to large commercial and industrial clients. Our commitment to quality, innovation, and customer
                satisfaction remains unwavering.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white py-16">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <stat.icon className="text-5xl text-primary-blue mx-auto mb-4" />
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="container-custom py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <FaEye className="text-5xl text-primary-blue mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading paint manufacturer recognized globally for innovation, quality, and sustainability.
                We envision a world where every space is beautifully painted with products that are safe for people
                and the planet.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="card p-8"
            >
              <FaBullseye className="text-5xl text-primary-green mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To deliver premium quality paints and coatings that exceed customer expectations while maintaining
                our commitment to environmental sustainability. We strive to innovate continuously and provide
                exceptional service at every touchpoint.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white py-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="section-title">Our Core Values</h2>
              <p className="section-subtitle">The principles that guide everything we do</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-blue/10 rounded-full mb-4">
                    <value.icon className="text-3xl text-primary-blue" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container-custom py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="card p-12 text-center bg-gradient-to-r from-primary-blue to-primary-green text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-xl mb-8">
              Discover our wide range of premium quality paints and coatings
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/products" className="bg-white text-primary-blue px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                View Products
              </a>
              <a href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-blue transition-colors">
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
