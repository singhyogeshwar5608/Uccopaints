import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  QueryConstraint,
  DocumentData,
  limit
} from 'firebase/firestore';
import { db } from './config';

// Generic CRUD operations
export const addDocument = async (collectionName: string, data: DocumentData) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateDocument = async (collectionName: string, docId: string, data: DocumentData) => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: serverTimestamp()
  });
};

export const deleteDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

export const getDocument = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  return null;
};

export const getDocuments = async (collectionName: string, constraints: QueryConstraint[] = []) => {
  const q = query(collection(db, collectionName), ...constraints);
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Specific queries
export const getActiveBanners = async () => {
  return getDocuments('banners', [
    where('isActive', '==', true),
    orderBy('order', 'asc')
  ]);
};

export const getActiveCategories = async () => {
  return getDocuments('categories', [
    where('isActive', '==', true),
    orderBy('order', 'asc')
  ]);
};

export const getActiveProducts = async () => {
  return getDocuments('products', [
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  ]);
};

export const getFeaturedProducts = async () => {
  return getDocuments('products', [
    where('isActive', '==', true),
    where('isFeatured', '==', true),
    orderBy('createdAt', 'desc'),
    limit(8)
  ]);
};

export const getProductsByCategory = async (categoryId: string) => {
  return getDocuments('products', [
    where('categoryId', '==', categoryId),
    where('isActive', '==', true),
    orderBy('createdAt', 'desc')
  ]);
};

export const getProductBySlug = async (slug: string) => {
  const products = await getDocuments('products', [
    where('slug', '==', slug),
    limit(1)
  ]);
  return products[0] || null;
};

export const getCategoryBySlug = async (slug: string) => {
  const categories = await getDocuments('categories', [
    where('slug', '==', slug),
    limit(1)
  ]);
  return categories[0] || null;
};

export const getInquiries = async (status?: string) => {
  const constraints: QueryConstraint[] = [orderBy('createdAt', 'desc')];
  if (status) {
    constraints.unshift(where('status', '==', status));
  }
  return getDocuments('inquiries', constraints);
};

export const getCompanyInfo = async () => {
  const settings = await getDocument('settings', 'companyInfo');
  return settings;
};
