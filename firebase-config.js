import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDqU4pdpFSCFoirSJUKG08kyJboyKgeEH4",
  authDomain: "clients-dp-portfolio.firebaseapp.com",
  projectId: "clients-dp-portfolio",
  storageBucket: "clients-dp-portfolio.firebasestorage.app",
  messagingSenderId: "850481600153",
  appId: "1:850481600153:web:ad62867d54636ae8434a08",
  measurementId: "G-0LRSRPYYRF"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
