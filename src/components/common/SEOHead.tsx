import React, { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'UCCOPAINTS - Bringing Colors to Life',
  description = 'Premium quality paints for residential, commercial and industrial projects. Eco-friendly, long-lasting, and available in a wide range of colors.',
  keywords = 'paints, uccopaints, interior paints, exterior paints, waterproofing, wood finishes, eco-friendly paints'
}) => {
  useEffect(() => {
    document.title = title;
    
    // Update meta tags
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    }
  }, [title, description, keywords]);

  return null;
};

export default SEOHead;
