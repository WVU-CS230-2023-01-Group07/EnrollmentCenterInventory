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
import { FormControl, FormGroup } from '@angular/forms';


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
export class SearchItemsLayoutComponent {


  constructor(private ps: ProductService){
    this.storeInput();
  }

 storeInput(){
    const input = document.getElementById("searchID") as HTMLInputElement;
    if (input) {
      const userInput = input.value;
      this.searchInput(userInput);
    }
  }

  searchInput(itemName: String): any {
    return this.ps.getProductBranch().subscribe((data:ItemModel []) => {
      for (var product of data) {
        console.log("item name iteration: " + product.itemName);
        if (product.itemName.toUpperCase() == itemName.toUpperCase())
        {
          console.log("Product found in database");
          console.log(product);
          return product;
        }
        
      }
      console.log("Product not found");
      return null;
    })
  }
}

