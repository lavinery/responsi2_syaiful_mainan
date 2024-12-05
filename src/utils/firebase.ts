// src/utils/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCiHA6JRRUOFfg4iogS0Js3cPu608aWQdo",
    authDomain: "responsi2-66f91.firebaseapp.com",
    projectId: "responsi2-66f91",
    storageBucket: "responsi2-66f91.firebasestorage.app",
    messagingSenderId: "237658820773",
    appId: "1:237658820773:web:1c92b73a506a723febfd4c"
};

const firebase = initializeApp(firebaseConfig);
const auth = getAuth(firebase);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(firebase);

export { auth, googleProvider, db };