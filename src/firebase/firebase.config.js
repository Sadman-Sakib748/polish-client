// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPIeO-K0a3BH9oGqwZvkZwI8p1fLFTpdc",
  authDomain: "assignment-11-a457b.firebaseapp.com",
  projectId: "assignment-11-a457b",
  storageBucket: "assignment-11-a457b.firebasestorage.app",
  messagingSenderId: "888949118829",
  appId: "1:888949118829:web:415e65ff4dde6f347eec64"
};
console.log*(firebaseConfig);

const app = initializeApp(firebaseConfig);

// ✅ Export the app properly
export { app };