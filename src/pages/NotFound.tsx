import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import SEOHead from '../components/common/SEOHead';

const NotFound: React.FC = () => {
  return (
    <>
      <SEOHead title="404 - Page Not Found | UCCOPAINTS" />
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="container-custom text-center py-16">
          <h1 className="text-9xl font-bold text-primary-blue mb-4">404</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center space-x-2">
            <FaHome />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
