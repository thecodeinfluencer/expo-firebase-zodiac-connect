import {
  FIREBASE_API_KEY,
  FIREBASE_APP_ID,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_MEASUREMENT_ID,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
} from '@env';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth';
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  remove,
  set,
  update,
} from 'firebase/database';
import { collection, doc, getFirestore, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const database = getDatabase(app);
const firestore = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export {
  app,
  createUserWithEmailAndPassword,
  auth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  database,
  ref,
  set,
  get,
  child,
  onValue,
  sendPasswordResetEmail,
  remove,
  doc,
  onSnapshot,
  firestore,
  collection,
  googleProvider,
  signInWithRedirect,
  signInWithPopup,
  update,
  analytics,
  logEvent,
  GoogleAuthProvider,
};
