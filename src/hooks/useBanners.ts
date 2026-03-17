import { useState, useEffect } from 'react';
import { Banner } from '../types';
import { getDocuments } from '../firebase/firestore';

export const useBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const data = await getDocuments('banners', []);
        // Filter active and sort in memory
        const activeBanners = (data as Banner[])
          .filter(banner => banner.isActive)
          .sort((a, b) => a.order - b.order);
        setBanners(activeBanners);
      } catch (err) {
        setError('Failed to fetch banners');
        console.error('Error fetching banners:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { banners, loading, error };
};
