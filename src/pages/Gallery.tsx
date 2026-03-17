import React, { useState, useEffect } from 'react';
import { FaImage, FaTimes } from 'react-icons/fa';
import { where } from 'firebase/firestore';
import { getDocuments } from '../firebase/firestore';
import LoadingSpinner from '../components/common/LoadingSpinner';

interface GalleryImage {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const data = await getDocuments('gallery', [
        where('isActive', '==', true)
      ]);
      // Sort by createdAt on client side to avoid Firestore index requirement
      const sortedData = (data as GalleryImage[]).sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      });
      setImages(sortedData);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner fullScreen />;

  return (
    <div className="min-h-screen bg-gray-50 py-12 sm:py-16">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Our <span className="text-primary-blue">Gallery</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Explore our collection of beautiful paint projects and color inspirations
          </p>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-16 sm:py-20">
            <FaImage className="mx-auto text-6xl sm:text-8xl text-gray-300 mb-4 sm:mb-6" />
            <p className="text-lg sm:text-xl text-gray-500">No images available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-sm sm:text-base font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      View Details
                    </span>
                  </div>
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
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl sm:text-4xl hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <FaTimes />
          </button>
          <div
            className="max-w-5xl w-full bg-white rounded-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full max-h-[70vh] object-contain"
            />
            <div className="p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                {selectedImage.title}
              </h2>
              {selectedImage.description && (
                <p className="text-sm sm:text-base text-gray-600">
                  {selectedImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
