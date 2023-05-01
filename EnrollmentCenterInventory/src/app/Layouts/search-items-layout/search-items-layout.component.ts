import { Component, OnInit, Query } from '@angular/core';
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove.service';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import 'firebase/database';
import 'firebase/compat/database';
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-search-items-layout',
  templateUrl: './search-items-layout.component.html',
  styleUrls: ['./search-items-layout.component.css']
})
export class SearchItemsLayoutComponent {
  // initalize search type to default to name
  searchBy: string = "Name";

  // Form validation of search entry
  searchID = new FormControl('',  [Validators.required, Validators.maxLength(25), Validators.pattern('([a-zA-z0-9-_]+)')]);

  // array of items resulting from search
  public resultsArray: ItemModel[] = [];

  // boolean representing if items were found from search
  found: boolean = false;

  constructor(private ps: ProductService, private psGet: DisplayService) {
    this.storeResults();
  }

  // sets search type based on option selected by user
  searchType(selection: string) {
    this.searchBy = selection;
  }


  // Function called by html upon button click
  // Stores search results in results array
  async storeResults() {
    var input = document.getElementById("searchID") as HTMLInputElement;

    // Continue if input is received from HTML element
    if (input) {

      // Returns if form control fails
      if (this.searchID.invalid) {
        alert("Invalid search terms");
        return;
      }
      const userInput = input.value;

      // call search function and verify results
      this.search(userInput).then(product => {
        if (product === null || product.length === 0) {
          console.log("item not found");
          alert("Item not found in inventory");
          return null;
        } else {
          console.log(product);
          this.found = true;
          return product;
        }
      });
    }
  }

  // Searches database for product with value that corresponds with user input
  search(itemProperty: string): Promise<ItemModel[] | null> {
    return new Promise((resolve) => {
      var items = this.psGet.getProducts();
      items.subscribe((data: ItemModel[]) => {

        // Search by name
        if (this.searchBy == "Name") {
          for (let item of data) {
            if (item.itemName.toUpperCase() == itemProperty.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }

        // Search by type
        if (this.searchBy == "Type") {
          for (let item of data) {
            if (item.itemType.toUpperCase() == itemProperty.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }

        // Search by barcode
        if (this.searchBy == "Barcode") {
          for (let item of data) {
            if (item.itemBarcode.toUpperCase() == itemProperty.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }

        // Search by location
        if (this.searchBy == "Location") {
          for (let item of data) {
            if (item.storageLocation.toUpperCase() == itemProperty.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }
        resolve(this.resultsArray);
      });
    });
  }
}