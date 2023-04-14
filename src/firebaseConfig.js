// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDf6JS8KN4YAls6q_rYgGJThovIXvMHACA",
  authDomain: "photo-editor-app-e2878.firebaseapp.com",
  projectId: "photo-editor-app-e2878",
  storageBucket: "photo-editor-app-e2878.appspot.com",
  messagingSenderId: "932705949416",
  appId: "1:932705949416:web:ef422d9990c83a5d96db5d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage } ;