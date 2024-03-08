// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYLJeEfFs7lQUJbczLFP87sLr7oDGK73Y",
  authDomain: "acguatuso-sys.firebaseapp.com",
  projectId: "acguatuso-sys",
  storageBucket: "acguatuso-sys.appspot.com",
  messagingSenderId: "148217571881",
  appId: "1:148217571881:web:5b959afe3352b16dae0a38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Obtener el objeto de autenticación de Firebase
export const auth_fire = getAuth(app);

// Obtener la referencia de la raiz para el almacenamiento de firebase
export const firebase_storage = getStorage();

//Obtener la referencia al servicio Cloud Firestore
export const db = getFirestore(app);