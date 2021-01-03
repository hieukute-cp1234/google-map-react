import firebase from 'firebase/app';
import 'firebase/auth';
import "firebase/analytics";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxenQTrAyBmLb6tp-PMr2fBvaT7tLJoKs",
  authDomain: "fir-map-app-df840.firebaseapp.com",
  projectId: "fir-map-app-df840",
  storageBucket: "fir-map-app-df840.appspot.com",
  messagingSenderId: "148001978370",
  appId: "1:148001978370:web:b234e4a2676ae75cfccf1b",
  measurementId: "G-SZR0TS5XZ1"
};

firebase.initializeApp(firebaseConfig);

export default firebase;