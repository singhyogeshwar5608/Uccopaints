import { useState, useEffect } from 'react';
import { Category } from '../types';
import { getDocuments, getCategoryBySlug } from '../firebase/firestore';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getDocuments('categories', []);
        // Filter active and sort in memory
        const activeCategories = (data as Category[])
          .filter(cat => cat.isActive)
          .sort((a, b) => a.order - b.order);
        setCategories(activeCategories);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export const useCategory = (slug: string) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await getCategoryBySlug(slug);
        setCategory(data as Category);
      } catch (err) {
        setError('Failed to fetch category');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategory();
    }
  }, [slug]);

  return { category, loading, error };
};
