import React from 'react';
import SEOHead from '../components/common/SEOHead';
import HeroSlider from '../components/home/HeroSlider';
import ProductCategories from '../components/home/ProductCategories';
import AboutSection from '../components/home/AboutSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ServicesSection from '../components/home/ServicesSection';
import GallerySection from '../components/home/GallerySection';
import FAQSection from '../components/home/FAQSection';
import ContactSection from '../components/home/ContactSection';

const Home: React.FC = () => {
  return (
    <>
      <SEOHead
        title="UCCOPAINTS - Premium Quality Paints | Bringing Colors to Life"
        description="UCCOPAINTS offers premium quality paints for residential, commercial and industrial projects. Eco-friendly, long-lasting, and available in a wide range of colors."
        keywords="uccopaints, premium paints, interior paints, exterior paints, waterproofing, wood finishes, eco-friendly paints, paint company"
      />
      
      <div className="w-full">
        {/* Hero Banner Slider */}
        <HeroSlider />
        
        {/* Product Categories Section */}
        <section className="py-16 bg-white">
          <ProductCategories />
        </section>
        
        {/* About Section */}
        <section className="py-16 bg-gray-50">
          <AboutSection />
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
          <WhyChooseUs />
        </section>
        
        {/* Services Section */}
        <section className="py-16 bg-gray-50">
          <ServicesSection />
        </section>
        
        {/* Gallery Section */}
        <GallerySection />
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <FAQSection />
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-gray-50">
          <ContactSection />
        </section>
      </div>
    </>
  );
};

export default Home;
