// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from '@firebase/auth';
import { getStorage, ref } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJS-0rvNnpxOTyHU9cWiEbTjHBJojq7b0",
  authDomain: "gardenia-b8dae.firebaseapp.com",
  projectId: "gardenia-b8dae",
  storageBucket: "gardenia-b8dae.appspot.com",
  messagingSenderId: "677613160736",
  appId: "1:677613160736:web:d221fe09a04e925c6aef45",
  measurementId: "G-J5JH8ZHGZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth(app); // Ensure this is exported if it's used in multiple components

export { db, app, auth, storage };
