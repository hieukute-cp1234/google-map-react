
import firebase from 'firebase/app';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyA8be5qb3625eCvAeHq3K-uq-ZjYSCS8UI",
  authDomain: "react-map-firebase.firebaseapp.com",
  projectId: "react-map-firebase",
  storageBucket: "react-map-firebase.appspot.com",
  messagingSenderId: "1023760726581",
  appId: "1:1023760726581:web:5755fb7f64c1237c8e4f7c",
  measurementId: "G-HF4JEMYRY9"
};

firebase.initializeApp(firebaseConfig);

export default firebase;