import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaWhatsapp, FaArrowLeft } from 'react-icons/fa';
import { useProduct } from '../hooks/useProducts';
import { useProductsByCategory } from '../hooks/useProducts';
import LoadingSpinner from '../components/common/LoadingSpinner';
import SEOHead from '../components/common/SEOHead';
import { ROUTES, COMPANY_INFO } from '../utils/constants';
import { getWhatsAppLink, truncateText } from '../utils/helpers';

const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading } = useProduct(slug || '');
  const { products: relatedProducts } = useProductsByCategory(product?.categoryId || '');
  const [selectedImage, setSelectedImage] = useState(0);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to={ROUTES.PRODUCTS} className="btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.mainImage];
  const relatedProductsFiltered = relatedProducts.filter(p => p.id !== product.id).slice(0, 4);

  const shareUrl = window.location.href;
  const shareText = `Check out ${product.name} from UCCOPAINTS`;

  return (
    <>
      <SEOHead
        title={`${product.name} | UCCOPAINTS`}
        description={product.shortDescription}
        keywords={`${product.name}, ${product.categoryName}, uccopaints, paint`}
      />

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="mb-8">
            <Link to={ROUTES.PRODUCTS} className="inline-flex items-center text-primary-blue hover:underline">
              <FaArrowLeft className="mr-2" />
              Back to Products
            </Link>
            <p className="text-gray-600 mt-2">
              Home / Products / {product.categoryName} / <span className="text-gray-900 font-semibold">{product.name}</span>
            </p>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Left: Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div className="card overflow-hidden mb-4">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`card overflow-hidden cursor-pointer transition-all ${
                        selectedImage === index ? 'ring-2 ring-primary-blue' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right: Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="badge-info mb-4">{product.categoryName}</span>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg mb-6">{product.shortDescription}</p>

              {product.price && (
                <div className="mb-6">
                  <span className="text-3xl font-bold text-primary-blue">
                    ₹{product.price.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={getWhatsAppLink(COMPANY_INFO.whatsapp, `Hi, I'm interested in ${product.name}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary flex items-center space-x-2"
                >
                  <FaWhatsapp />
                  <span>Request Quote</span>
                </a>
                <Link to={ROUTES.CONTACT} className="btn-outline">
                  Contact Us
                </Link>
              </div>

              {/* Share */}
              <div className="border-t pt-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Share this product:</h3>
                <div className="flex space-x-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FaFacebook size={20} />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-colors"
                  >
                    <FaTwitter size={20} />
                  </a>
                  <a
                    href={getWhatsAppLink(COMPANY_INFO.whatsapp, `${shareText} - ${shareUrl}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                  >
                    <FaWhatsapp size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs Section */}
          <div className="card p-8 mb-16">
            <div className="border-b mb-6">
              <div className="flex space-x-8">
                <button className="pb-4 border-b-2 border-primary-blue text-primary-blue font-semibold">
                  Description
                </button>
              </div>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Description</h3>
              <p className="text-gray-600 mb-6">{product.description}</p>

              {product.features && product.features.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h3>
                  <ul className="list-disc list-inside space-y-2 mb-6">
                    {product.features.map((feature, index) => (
                      <li key={index} className="text-gray-600">{feature}</li>
                    ))}
                  </ul>
                </>
              )}

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specifications</h3>
                  <table className="w-full border-collapse">
                    <tbody>
                      {Object.entries(product.specifications).map(([key, value], index) => (
                        <tr key={index} className="border-b">
                          <td className="py-3 font-semibold text-gray-700 w-1/3">{key}</td>
                          <td className="py-3 text-gray-600">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProductsFiltered.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">You May Also Like</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProductsFiltered.map((relatedProduct, index) => (
                  <motion.div
                    key={relatedProduct.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link to={`/products/${relatedProduct.slug}`} className="card overflow-hidden group block">
                      <div className="image-zoom-container h-48">
                        <img
                          src={relatedProduct.mainImage}
                          alt={relatedProduct.name}
                          className="image-zoom w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-blue transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {truncateText(relatedProduct.shortDescription, 60)}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
