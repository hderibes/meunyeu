import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

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

const app = initializeApp(firebaseConfig);
console.log("created");
const db = getFirestore(app);

export default {db, app};