import "firebase/auth";

import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDKm5mQGoBHnvoB4-fqcPXyDJI_qiA7U5c",
    authDomain: "movie-d25f8.firebaseapp.com",
    databaseURL: "https://movie-d25f8-default-rtdb.firebaseio.com",
    projectId: "movie-d25f8",
    storageBucket: "movie-d25f8.appspot.com",
    messagingSenderId: "185911526858",
    appId: "1:185911526858:web:24d6de329483b15266fb33"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.database("https://movie-d25f8-default-rtdb.firebaseio.com/");
//const userId = firebase.auth().currentUser.uid
export default db;