import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


import firebase from 'firebase/compat/app';
import 'firebase/database';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { SearchItemsLayoutComponent } from './app/Layouts/search-items-layout/search-items-layout.component';

// Initialize Firebase app
const firebaseConfig = {
  apiKey: "AIzaSyBmw3wWKx2a9JwHyunk-YRl8CoyIVg3g80",
  authDomain: "wvu-ec-database.firebaseapp.com",
  projectId: "wvu-ec-database",
  storageBucket: "wvu-ec-database.appspot.com",
  messagingSenderId: "822312610806",
  appId: "1:822312610806:web:31d6079d4fece09d4cf5d7",
  measurementId: "G-6JWJ4FNF16"
};
const app = initializeApp(firebaseConfig);

// Get a reference to the database
const dbRef = ref(getDatabase(app));

// Listen for changes to the data
onValue(dbRef, (snapshot) => {
  console.log(snapshot.val());
});




