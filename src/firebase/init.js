import firebase from "firebase";
import firestore from "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyBdVJ6VSzy8Hc0IoWyodrvUEcfDVH-r71E",
    authDomain: "learn-vue-ed7c0.firebaseapp.com",
    databaseURL: "https://learn-vue-ed7c0-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learn-vue-ed7c0",
    storageBucket: "learn-vue-ed7c0.appspot.com",
    messagingSenderId: "559415820697",
    appId: "1:559415820697:web:85a6f855d586d94a425308",
    measurementId: "G-HX48JL5GY9"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore().settings({ timestampsInSnapshots: true })

export default firebaseApp.firestore()