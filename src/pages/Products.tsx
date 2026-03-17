import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEOHead from '../components/common/SEOHead';
import { truncateText } from '../utils/helpers';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const { products, loading: productsLoading } = useProducts();
  const { categories, loading: categoriesLoading } = useCategories();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryFilter ? [categoryFilter] : []
  );

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.categoryId);
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, selectedCategories]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchTerm('');
  };

  if (productsLoading || categoriesLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <>
      <SEOHead
        title="Our Products | UCCOPAINTS"
        description="Browse our comprehensive range of premium quality paints including interior emulsions, exterior paints, wood finishes, and waterproofing solutions."
        keywords="paint products, interior paints, exterior paints, wood finishes, waterproofing, uccopaints products"
      />

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container-custom">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
            <p className="text-gray-600">
              Home / <span className="text-primary-blue">Products</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:col-span-1">
              <div className="card p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Products
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search..."
                      className="input-field pl-10"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Categories
                  </label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category.id} className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.id)}
                          onChange={() => toggleCategory(category.id)}
                          className="w-4 h-4 text-primary-blue focus:ring-primary-blue border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">{category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {(selectedCategories.length > 0 || searchTerm) && (
                  <button
                    onClick={clearFilters}
                    className="w-full btn-outline text-sm"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {filteredProducts.length} of {products.length} products
                </p>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="card p-12 text-center">
                  <p className="text-gray-600 text-lg">No products found matching your criteria.</p>
                  <button onClick={clearFilters} className="btn-primary mt-4">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <Link to={`/products/${product.slug}`} className="card overflow-hidden group block h-full">
                        <div className="image-zoom-container h-48">
                          <img
                            src={product.mainImage}
                            alt={product.name}
                            className="image-zoom w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <span className="badge-info text-xs mb-2">
                            {product.categoryName}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {truncateText(product.shortDescription, 80)}
                          </p>
                          <span className="text-primary-blue font-semibold group-hover:underline">
                            View Details →
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
