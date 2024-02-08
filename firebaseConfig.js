import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkld3depG_wgKs2iaXNu-UytQE2uNbxZA",
    authDomain: "meunyeu-8c4a3.firebaseapp.com",
    databaseURL: "https://meunyeu-8c4a3-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "meunyeu-8c4a3", 
    storageBucket: "meunyeu-8c4a3.appspot.com", 
    messagingSenderId: "104966578440", 
    appId: "1:104966578440:web:6c75cff05fa8c8d5b14cbd",
    measurementId: "G-3NXLBTXWK2"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;