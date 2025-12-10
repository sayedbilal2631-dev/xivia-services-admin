import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyDl_A8bGkwr-wjlxX3fu2o6xnZa8vWVdKk",
  authDomain: "xiviaservices.firebaseapp.com",
  projectId: "xiviaservices",
  storageBucket: "xiviaservices.firebasestorage.app",
  messagingSenderId: "676795021885",
  appId: "1:676795021885:web:226c96a7d718c2e5ba0854",
  measurementId: "G-DPCRXSM71R"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
