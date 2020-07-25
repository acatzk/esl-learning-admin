import firebase from "firebase";
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAE00QgUrP0dR0v2nlvlzxuQgkZL3_j-XM",
    authDomain: "vic-solution-admin.firebaseapp.com",
    databaseURL: "https://vic-solution-admin.firebaseio.com",
    projectId: "vic-solution-admin",
    storageBucket: "vic-solution-admin.appspot.com",
    messagingSenderId: "565755394111",
    appId: "1:565755394111:web:47e5aa6cf7d6e3f100608a",
    measurementId: "G-JVH39C0YPM"
  };

// firebase utils
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const messaging = firebase.messaging()

export {
  fb,
  db,
  auth,
  messaging,
  currentUser
}