import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { COMPANY_INFO, ROUTES } from '../../utils/constants';
import { scrollToTop } from '../../utils/helpers';

const Footer: React.FC = () => {
  const productCategories = [
    { name: 'Interior Emulsions', slug: 'interior-emulsions' },
    { name: 'Exterior Emulsions', slug: 'exterior-emulsions' },
    { name: 'Wood Finishes', slug: 'wood-finishes' },
    { name: 'Waterproofing', slug: 'waterproofing' }
  ];

  return (
    <footer className="bg-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              UCCO<span className="text-primary-orange">PAINTS</span>
            </h3>
            <p className="text-gray-300 mb-4">{COMPANY_INFO.tagline}</p>
            <p className="text-gray-400 text-sm mb-6">
              Premium quality paints for residential, commercial and industrial projects.
              Bringing colors to life with eco-friendly solutions.
            </p>
            <div className="flex space-x-4">
              <a
                href={COMPANY_INFO.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-blue transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href={COMPANY_INFO.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary-orange transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href={COMPANY_INFO.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href={COMPANY_INFO.socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaYoutube size={24} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.HOME} className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to={ROUTES.PRODUCTS} className="text-gray-400 hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT} className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.SERVICES} className="text-gray-400 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2">
              {productCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={ROUTES.PRODUCTS}
                  className="text-primary-blue hover:text-primary-orange transition-colors font-semibold"
                >
                  View All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-blue mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <strong className="text-white block mb-1">Manufacturing:</strong>
                  {COMPANY_INFO.manufacturingAddress}
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary-blue mt-1 flex-shrink-0" />
                <div className="text-gray-400 text-sm">
                  <strong className="text-white block mb-1">Head Office:</strong>
                  {COMPANY_INFO.headOffice}
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary-green flex-shrink-0" />
                <a href={`tel:${COMPANY_INFO.phone}`} className="text-gray-400 hover:text-white transition-colors">
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary-orange flex-shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="text-gray-400 text-sm mt-4">
                <strong className="text-white">Business Hours:</strong>
                <br />
                {COMPANY_INFO.businessHours}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 text-sm text-center md:text-left mb-4 md:mb-0">
              © {new Date().getFullYear()} UCCOPAINTS. All rights reserved. Created By Larawans Digital Agency
            </p>
            <div className="flex items-center space-x-6">
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms & Conditions
              </Link>
              <button
                onClick={() => scrollToTop()}
                className="bg-primary-blue text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                aria-label="Back to top"
              >
                <FaArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
