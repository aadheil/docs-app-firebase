import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyCV-LvxO-qACeKsnpUjNh72wal3WWs9ZMw",
    authDomain: "docsapp-f6b00.firebaseapp.com",
    projectId: "docsapp-f6b00",
    storageBucket: "docsapp-f6b00.appspot.com",
    messagingSenderId: "530217726155",
    appId: "1:530217726155:web:a10ff09fcaa5cddf07ab4e",
    measurementId: "G-CP2DPDFXZY"
  };


  const app=initializeApp(firebaseConfig);

  export const db = getFirestore(app)