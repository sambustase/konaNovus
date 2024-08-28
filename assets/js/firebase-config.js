// firebase-config.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCv9qeCnEahdx2you0Kz8bU4zxmsNTOOvQ",
    authDomain: "konanovus.firebaseapp.com",
    projectId: "konanovus",
    storageBucket: "konanovus.appspot.com",
    messagingSenderId: "655095640638",
    appId: "1:655095640638:web:1a48896088a81d0441176f",
    measurementId: "G-LQTX42Y45R"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Inicializar la autenticación

export { auth };
