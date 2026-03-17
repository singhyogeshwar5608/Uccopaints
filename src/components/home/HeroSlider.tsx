import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useBanners } from '../../hooks/useBanners';
import LoadingSpinner from '../common/LoadingSpinner';
import { ROUTES } from '../../utils/constants';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const HeroSlider: React.FC = () => {
  const { banners, loading } = useBanners();

  if (loading) {
    return (
      <div className="h-[400px] md:h-[600px] bg-gray-200 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!banners || banners.length === 0) {
    return (
      <div className="relative h-[400px] md:h-[600px] bg-gradient-to-r from-primary-blue to-primary-green flex items-center justify-center">
        <div className="container-custom text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Welcome to UCCOPAINTS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8"
          >
            Bringing Colors to Life
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to={ROUTES.PRODUCTS} className="btn-primary text-lg px-8 py-4">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        className="h-[400px] md:h-[600px]"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full">
              <img
                src={banner.imageUrl}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="container-custom text-center text-white">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4"
                  >
                    {banner.title}
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                    className="text-lg md:text-xl lg:text-2xl mb-8"
                  >
                    {banner.subtitle}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.4 }}
                  >
                    <Link to={ROUTES.PRODUCTS} className="btn-primary text-lg px-8 py-4">
                      Explore Products
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
