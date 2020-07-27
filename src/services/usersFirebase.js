import firebase from "firebase";
import 'firebase/storage'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBw4reOmcB0ACKM-4rqI5229G9PEtH-rEc",
    authDomain: "vic-airclass-solution-users.firebaseapp.com",
    databaseURL: "https://vic-airclass-solution-users.firebaseio.com",
    projectId: "vic-airclass-solution-users",
    storageBucket: "vic-airclass-solution-users.appspot.com",
    messagingSenderId: "294272067604",
    appId: "1:294272067604:web:55581089f723603ebc5f01",
    measurementId: "G-SBZBNJ4QSE"
}

// firebase utils
const fb2 = firebase.initializeApp(firebaseConfig);

export {
  fb2
}