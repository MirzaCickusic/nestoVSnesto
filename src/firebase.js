import firebase from 'firebase/app';
import 'firebase/firestore';
try {
    const app = {
        apiKey: "AIzaSyCNk5CmUx8Hm6TdO5p_jJQqfD-d0RGWBy8",
        authDomain: "nestovsnesto.firebaseapp.com",
        databaseURL: "https://nestovsnesto.firebaseio.com",
        projectId: "nestovsnesto",
        storageBucket: "nestovsnesto.appspot.com",
        messagingSenderId: "332679665715",
        appId: "1:332679665715:web:e0670ab531cf0b31d76b46",
        measurementId: "G-P0QEGS6J39"
    };
    firebase.initializeApp(app);


} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack)
    }
}

export const db = firebase.firestore();
