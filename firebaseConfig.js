import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



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

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export {db, app, auth};