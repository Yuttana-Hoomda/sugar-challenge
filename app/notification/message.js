import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDKRpZBbRQjYJ2J0VdRbyD-VzBVbK-5T4g",
    authDomain: "fcm-demo-sugar.firebaseapp.com",
    projectId: "fcm-demo-sugar",
    storageBucket: "fcm-demo-sugar.appspot.com",
    messagingSenderId: "676194310278",
    appId: "1:676194310278:web:0213d8745427db513a1907",
    measurementId: "G-BL9DGBQMJQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);