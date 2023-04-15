import { Component, OnInit, Query } from '@angular/core';
import { DataSnapshot, get, getDatabase, onValue, orderByChild, ref } from 'firebase/database';
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove-service';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import { FirebaseApp } from '@angular/fire/app';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, query, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/compat';
import 'firebase/database';
import 'firebase/compat/database';


interface Item {
  itemName: string;
  shelfCapacity: number;
  itemQuantity: number;
  storageLocation: string;
  itemType: string;
  itemBarcode: string;
}


@Component({
  selector: 'app-search-items-layout',
  templateUrl: './search-items-layout.component.html',
  styleUrls: ['./search-items-layout.component.css']
})
export class SearchItemsLayoutComponent implements OnInit {


  searchItem: String = '';
  db = getDatabase();
  productsRef = ref(this.db, '/Products');

  constructor(private ps: ProductService){

  }

  ngOnInit(): void {
    console.log(this.productsRef);
  }
  




 // test = this.linearSearch("test");


  // linearSearch(productName: String): void{
  //   // Get a database reference to our posts
  //   const db = getDatabase();
  //   const name = "example name";
  //   const productsRef = ref(db, '/Products');
  //   const query = orderByChild('/Products');
  //   var playersRef = firebase.database().ref("players/");

  //   productsRef.orderByChild("name").on("child_added", function(data) {
  //     console.log(data.val().name);
  //  });
    
    
  //   // Attach an asynchronous callback to read the data at our posts reference
  //   onValue(productRef, (snapshot: DataSnapshot) => {
  //     const data = snapshot.val();
  //     console.log(snapshot.val());
  //   }, (errorObject: any) => {
  //     console.log('The read failed: ' + errorObject.name);
  //   });
  // }

}
