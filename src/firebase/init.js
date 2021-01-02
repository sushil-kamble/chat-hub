import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

// REPLACE your firebaseConfig object here.
const firebaseConfig = {
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_DATBASE_URL,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_ID,
  appId: process.env.VUE_APP_APP_ID,
  measurementId: process.env.VUE_APP_MEASUREMENT_ID
};

// REPLACE your firebaseConfig object here.

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// utils
// const db = firebase.firestore();
// const rt = firebase.database();

const auth = firebase.auth();
const real = firebase.database();

export { auth, real };

// export { auth, db, rt }

// Use whatever feature you want and then export it
