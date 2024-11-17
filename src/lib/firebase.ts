import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, updateDoc, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Collection references
export const projectsCollection = collection(db, 'projects');
export const costBreakdownCollection = collection(db, 'costBreakdown');
export const changeOrdersCollection = collection(db, 'changeOrders');
export const paymentsCollection = collection(db, 'payments');
export const invoicesCollection = collection(db, 'invoices');
export const scheduleCollection = collection(db, 'schedule');

// Helper functions for CRUD operations
export async function createDocument(collectionName: string, id: string, data: any) {
  const docRef = doc(db, collectionName, id);
  await setDoc(docRef, { ...data, createdAt: new Date().toISOString() });
  return docRef;
}

export async function updateDocument(collectionName: string, id: string, data: any) {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, { ...data, updatedAt: new Date().toISOString() });
  return docRef;
}

export async function deleteDocument(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id);
  await deleteDoc(docRef);
  return docRef;
}

export async function queryCollection(collectionName: string, whereClause: [string, any, any][]) {
  const collectionRef = collection(db, collectionName);
  const q = query(collectionRef, ...whereClause.map(([field, op, value]) => where(field, op, value)));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}