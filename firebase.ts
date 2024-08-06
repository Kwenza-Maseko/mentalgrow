import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD5t3ygTY49Sl9mfjIVQKkfUpwg_ppIEow",
    authDomain: "mgrow-f332a.firebaseapp.com",
    projectId: "mgrow-f332a",
    storageBucket: "mgrow-f332a.appspot.com",
    messagingSenderId: "1041214451908",
    appId: "1:1041214451908:web:bf2c41526e0af1dc42d991",
    measurementId: "G-XVEW17LR02"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
