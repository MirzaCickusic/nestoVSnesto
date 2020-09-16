import firebase from 'firebase/app';
import 'firebase/firestore';
try {
    const app = {
        apiKey: "",
        authDomain: "",
        databaseURL: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    };
    firebase.initializeApp(app);


} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error raised', err.stack)
    }
}

export const db = firebase.firestore();
