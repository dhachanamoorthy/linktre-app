import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGGihwsSxARI_0tTriF6RdSxscaRW9vg4",
  authDomain: "auth-service-77ccb.firebaseapp.com",
  databaseURL:
    "https://auth-service-77ccb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-service-77ccb",
  storageBucket: "auth-service-77ccb.appspot.com",
  messagingSenderId: "93980911595",
  appId: "1:93980911595:web:5bac5d4472e6100fc01bae",
  measurementId: "G-QGB9K4BY01",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
