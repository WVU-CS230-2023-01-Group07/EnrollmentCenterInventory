import * as firebase from "firebase/compat";
import 'firebase/database';

export const environment = {
  firebase: {
    projectId: 'wvu-ec-database',
    appId: '1:822312610806:web:31d6079d4fece09d4cf5d7',
    databaseURL: 'https://wvu-ec-database-default-rtdb.firebaseio.com',
    storageBucket: 'wvu-ec-database.appspot.com',
    apiKey: 'AIzaSyBmw3wWKx2a9JwHyunk-YRl8CoyIVg3g80',
    authDomain: 'wvu-ec-database.firebaseapp.com',
    messagingSenderId: '822312610806',
    measurementId: 'G-6JWJ4FNF16',
  },};

  // Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmw3wWKx2a9JwHyunk-YRl8CoyIVg3g80",
  authDomain: "wvu-ec-database.firebaseapp.com",
  databaseURL: "https://wvu-ec-database-default-rtdb.firebaseio.com",
  projectId: "wvu-ec-database",
  storageBucket: "wvu-ec-database.appspot.com",
  messagingSenderId: "822312610806",
  appId: "1:822312610806:web:b5a02b918a64dde94cf5d7",
  measurementId: "G-60KEC0YDYL"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);


