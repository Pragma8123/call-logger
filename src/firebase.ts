import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCWbibxSn4B1vWMJ08k-w2FyOD2px8prKU',
  authDomain: 'call-logger-dev.firebaseapp.com',
  projectId: 'call-logger-dev',
  storageBucket: 'call-logger-dev.appspot.com',
  messagingSenderId: '1098555473142',
  appId: '1:1098555473142:web:5eccc59392adfafb0c40d7',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
