import { Component, OnInit, Query } from '@angular/core';
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove.service';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import 'firebase/database';
import 'firebase/compat/database';
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'


@Component({
  selector: 'app-search-items-layout',
  templateUrl: './search-items-layout.component.html',
  styleUrls: ['./search-items-layout.component.css']
})
export class SearchItemsLayoutComponent {
  // array of items resulting from search
  public resultsArray: ItemModel[] = [];

  // boolean representing if items were found from search
  found: boolean = false;

  constructor(private ps: ProductService, private psGet: DisplayService) {
    this.storeInput();
  }


  // Function called by html upon button click
  storeInput() {
    const input = document.getElementById("searchID") as HTMLInputElement;
    if (input) {
      const userInput = input.value;
      this.searchByName(userInput).then(product => {
        if (product === null || product.length === 0) {
          return null;
        } else {
          console.log(product);
          this.found = true;
          return product;
        }
      });
    }
  }

  // Searches database for product with name that corresponds with user input
  searchByName(itemName: string): Promise<ItemModel[] | null> {    
    return new Promise((resolve) => {
      var items = this.psGet.getProducts();
      items.subscribe((data: ItemModel[]) => {
        for (let item of data) {
          if (item.itemName.toUpperCase() == itemName.toUpperCase()) {
            this.resultsArray.push(item);
          }
        }
        resolve(this.resultsArray);
      });
    });
  }

  // TODO: Search by category


  // TODO: Search by Product ID
}