import firebase from 'firebase/app'
import "firebase/firebase-auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyC9JrbMwLr80UzSq_fsttVXe3YSAY_Mk3M",
    authDomain: "chat-app-cbaae.firebaseapp.com",
    projectId: "chat-app-cbaae",
    storageBucket: "chat-app-cbaae.appspot.com",
    messagingSenderId: "517174127600",
    appId: "1:517174127600:web:6fbd09d11fc33f31c3cb35",
    measurementId: "G-KMN3T0NZS4"
  }).auth();