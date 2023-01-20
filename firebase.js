import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyDj0JsLs_C_0O39K-iNofClAQJArgLXvSM",
    authDomain: "emily-4af80.firebaseapp.com",
    projectId: "emily-4af80",
    storageBucket: "emily-4af80.appspot.com",
    messagingSenderId: "157588818635",
    appId: "1:157588818635:web:fa7e0af34a7c0377d2694e"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
