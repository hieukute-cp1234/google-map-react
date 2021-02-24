import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCt7aaFKYw6yRNSYGiu6SY3UIzrBZqkf2c",
  authDomain: "map-firebase-ce479.firebaseapp.com",
  projectId: "map-firebase-ce479",
  storageBucket: "map-firebase-ce479.appspot.com",
  messagingSenderId: "647811829304",
  appId: "1:647811829304:web:1733551048d817309360cd",
  measurementId: "G-JMELM33D3L"
};

firebase.initializeApp(firebaseConfig);

export default firebase;