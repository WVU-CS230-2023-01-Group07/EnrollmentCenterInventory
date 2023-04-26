import { Component, OnInit, Query } from '@angular/core';
import { DataSnapshot, get, getDatabase, onValue, orderByChild, ref } from 'firebase/database';
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove.service';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import { FirebaseApp } from '@angular/fire/app';
import { inject } from '@angular/core';
import { Firestore, collectionData, collection, query, CollectionReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/compat';
import 'firebase/database';
import 'firebase/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { FoundLayoutComponent } from '../found-layout/found-layout.component';

@Component({
  selector: 'app-search-items-layout',
  templateUrl: './search-items-layout.component.html',
  styleUrls: ['./search-items-layout.component.css']
})
export class SearchItemsLayoutComponent {


  constructor(private ps: ProductService) {
    this.storeInput();
  }

  // Function called by html upon button click
  storeInput() {
    const input = document.getElementById("searchID") as HTMLInputElement;
    if (input) {
      const userInput = input.value;
      this.searchInput(userInput).then(product => {
        if (product === null) {
          window.location.href = "not-found";
          return null;
        } else {
          console.log("product below");
          console.log(product);
          window.location.href = "found";
          return product;
        }
      });
    }
  }

  // Searches database for product with name that corresponds with user input
  searchInput(itemName: string): Promise<ItemModel | null> {
    return new Promise((resolve) => {
      this.ps.getProductsBranch().subscribe((data: ItemModel[]) => {
        for (var product of data) {
          if (product.itemName.toUpperCase() == itemName.toUpperCase()) {
            console.log("Product found in database");
            console.log(product);
            // alert(
            //   "Product found in inventory: \n" +
            //   "Name: " + product.itemName + "\n" +
            //   "Barcode: " + product.itemBarcode + "\n" +
            //   "Quantity: " + product.itemQuantity + "\n" +
            //   "Shelf Capacity: " + product.shelfCapacity + "\n" +
            //   "Storage Location: " + product.storageLocation + "\n" +
            //   "Type: " + product.itemType
            // );
            resolve(product);
            return;
          }
        }
        console.log("Product not found");
        // alert("Item not found in inventory");
        resolve(null);
      });
    });
  }
}

