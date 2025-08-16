// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDCuDZityOH0YtYSbot_IuAs7FczN6EcPg',
  authDomain: 'storage-616b8.firebaseapp.com',
  projectId: 'storage-616b8',
  storageBucket: 'storage-616b8.firebasestorage.app',
  messagingSenderId: '356384849664',
  appId: '1:356384849664:web:883e470160f79480edfde5',
  measurementId: 'G-KVQ5NBCGFX',
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { storage, db };
