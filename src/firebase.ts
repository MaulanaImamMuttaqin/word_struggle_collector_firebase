import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyAZCDAZmeGrE-cWfiPzZuDpCYBsRbXw89Y",
    authDomain: "word-struggle-c995e.firebaseapp.com",
    projectId: "word-struggle-c995e",
    storageBucket: "word-struggle-c995e.appspot.com",
    messagingSenderId: "191287497650",
    appId: "1:191287497650:web:7d9b725639544549490aab",
    measurementId: "G-0MLXZ9WSCR"
};


const app = initializeApp(firebaseConfig)

export const db = getFirestore(app);
// export const yes = " yes"