import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../../hooks/useCategories';
import LoadingSpinner from '../common/LoadingSpinner';
import { ROUTES } from '../../utils/constants';

const ProductCategories: React.FC = () => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="container-custom">
        <LoadingSpinner />
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="container-custom text-center py-8">
        <p className="text-gray-600">No categories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="container-custom">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="section-title">Our Product Range</h2>
        <p className="section-subtitle">
          Discover our comprehensive collection of premium quality paints
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Link
              to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
              className="card overflow-hidden group block"
            >
              <div className="image-zoom-container h-48">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="image-zoom w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark mb-2 group-hover:text-primary-blue transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <span className="text-primary-blue font-semibold group-hover:underline">
                  Explore →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategories;
