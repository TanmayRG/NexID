import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDM8u68oc8Yl7RfZBLkegvKjCbUg6nzANI",
  authDomain: "futuriscan.firebaseapp.com",
  projectId: "futuriscan",
  storageBucket: "futuriscan.firebasestorage.app",
  messagingSenderId: "494659956739",
  appId: "1:494659956739:web:0f4a3bcc99768a5a1f9e36",
  measurementId: "G-D2D3LS8YCR"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); 