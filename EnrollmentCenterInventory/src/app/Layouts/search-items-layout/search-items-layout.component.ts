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

/**
 * @author Jacob Comer
 * @classdesc Searches through database and returns array of results.
 */
export class SearchItemsLayoutComponent {
  // initalize search type to default to name
  searchBy: string = "Name";

  // Form validation of search entry
  searchID = new FormControl('',  [Validators.required, Validators.maxLength(25), Validators.pattern('([a-zA-z0-9-_]+)')]);

  // array of items resulting from search
  public resultsArray: ItemModel[] = [];

  // boolean representing if items were found from search
  found: boolean = false;

  /**
   * @param ps Product service instance
   * @param psGet Display service instance
   */
  constructor(private ps: ProductService, private psGet: DisplayService) {
    this.storeResults();
  }

  // sets search type based on option selected by user
  searchType(selection: string) {
    this.searchBy = selection;
  }



  /**
   * @summary Waits for user input, verifies input when received.  Input value is extracted and search function called.
   */
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
        } else {
          console.log(product);
          this.found = true;
        }
      });
    }
  }

  /**
   * @param userInput - Search input from user
   * @returns ItemModel[] - array of search results that match user input 
   * @summary Searches database for product with value that corresponds with user input, storing results in array.
   */
  search(userInput: string): Promise<ItemModel[] | null> {
    return new Promise((resolve) => {
      var items = this.psGet.getProducts();
      items.subscribe((data: ItemModel[]) => {

        // Search by name
        if (this.searchBy == "Name") {
          for (let item of data) {
            if (item.itemName.toUpperCase() == userInput.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }

        // Search by type
        if (this.searchBy == "Type") {
          for (let item of data) {
            if (item.itemType.toUpperCase() == userInput.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }

        // Search by barcode
        if (this.searchBy == "Barcode") {
          for (let item of data) {
            if (item.itemBarcode.toUpperCase() == userInput.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }

        // Search by location
        if (this.searchBy == "Location") {
          for (let item of data) {
            if (item.storageLocation.toUpperCase() == userInput.toUpperCase()) {
              this.resultsArray.push(item);
            }
          }
        }
        resolve(this.resultsArray);
      });
    });
  }
}