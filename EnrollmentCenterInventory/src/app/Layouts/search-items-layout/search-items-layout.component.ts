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
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'


@Component({
  selector: 'app-search-items-layout',
  templateUrl: './search-items-layout.component.html',
  styleUrls: ['./search-items-layout.component.css']
})
export class SearchItemsLayoutComponent {


  constructor(private ps: ProductService, private psGet: DisplayService) {
    this.storeInput();
  }

  // Function called by html upon button click
  storeInput() {
    const input = document.getElementById("searchID") as HTMLInputElement;
    console.log("inside store input");
    if (input) {
      console.log("inside if block");
      const userInput = input.value;
      this.searchInput(userInput).then(product => {
        if (product === null) {
          //window.location.href = "not-found";
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
    console.log("inside search input");
    return new Promise((resolve) => {
      var items = this.psGet.getProduct();
      console.log(items);
      var found = false;
      console.log(items.length);
      items.forEach((item) => {
        console.log("iterate");
        console.log(item.itemName);
        if (item.itemName.toUpperCase() == itemName.toUpperCase()) {
          found=true;
          resolve(item);
        }
      });
      if (!found){
        console.log("item not found");
        resolve(null);
      }
    });
    // return new Promise((resolve) => {
    //   console.log("inside promise");
    //   this.ps.getProductsBranch().subscribe((data: ItemModel[]) => {
    //     console.log("inside products branch");
    //     for (var product of data) {
    //       if (product.itemName.toUpperCase() == itemName.toUpperCase()) {
    //         console.log("Product found in database");
    //         console.log(product);
    //         // alert(
    //         //   "Product found in inventory: \n" +
    //         //   "Name: " + product.itemName + "\n" +
    //         //   "Barcode: " + product.itemBarcode + "\n" +
    //         //   "Quantity: " + product.itemQuantity + "\n" +
    //         //   "Shelf Capacity: " + product.shelfCapacity + "\n" +
    //         //   "Storage Location: " + product.storageLocation + "\n" +
    //         //   "Type: " + product.itemType
    //         // );
    //         resolve(product);
    //         return;
    //       }
    //     }
    //     console.log("Product not found");
    //     // alert("Item not found in inventory");
    //     resolve(null);
    //   });
    // });
  }
}

