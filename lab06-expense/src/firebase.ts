
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";  
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8SMsbv9NYHsiZwWn0y1hcvRznW8HZUUs",
  authDomain: "mobileweb-1ef3e.firebaseapp.com",
  projectId: "mobileweb-1ef3e",
  storageBucket: "mobileweb-1ef3e.firebasestorage.app",
  messagingSenderId: "269504115754",
  appId: "1:269504115754:web:90aef835c484f3a2d4ff53",
  measurementId: "G-81VKJ0VPBF"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);