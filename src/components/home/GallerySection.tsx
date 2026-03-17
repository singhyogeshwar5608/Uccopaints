import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaImage } from 'react-icons/fa';
import { where } from 'firebase/firestore';
import { getDocuments } from '../../firebase/firestore';
import { ROUTES } from '../../utils/constants';
import LoadingSpinner from '../common/LoadingSpinner';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  isActive: boolean;
}

const GallerySection: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getDocuments('gallery', [
        where('isActive', '==', true)
      ]);
      // Sort by createdAt on client side and take first 6
      const sortedData = (data as GalleryImage[]).sort((a: any, b: any) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      }).slice(0, 6);
      setImages(sortedData);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container-custom">
          <LoadingSpinner />
        </div>
      </section>
    );
  }

  if (images.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-primary-blue">Gallery</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore our collection of beautiful paint projects and color inspirations
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300" />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                  {image.title}
                </h3>
                {image.description && (
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                    {image.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to={ROUTES.GALLERY}
            className="inline-flex items-center space-x-2 btn-primary h-12 px-6 sm:px-8"
          >
            <FaImage />
            <span>View Full Gallery</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
