import { Component, OnInit, Query } from '@angular/core';
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove.service';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import 'firebase/database';
import 'firebase/compat/database';
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'
import { SearchService } from './search.service';


@Component({
  selector: 'app-search-items-layout',
  templateUrl: './search-items-layout.component.html',
  styleUrls: ['./search-items-layout.component.css']
})
export class SearchItemsLayoutComponent {
  public items: ItemModel[] = [];
  found: boolean = false;

  constructor(private ps: ProductService, private psGet: DisplayService, private sv: SearchService) {
    this.storeInput();
  }


  // Function called by html upon button click
  storeInput() {
    const input = document.getElementById("searchID") as HTMLInputElement;
    console.log("inside store input");
    if (input) {
      console.log("inside if block");
      const userInput = input.value;
      this.searchByName(userInput).then(product => {
        if (product === null || product.length === 0) {
          // window.location.href = "not-found";
          return null;
        } else {
          console.log(product);
          this.PassData();
          this.found = true;
          //window.location.href = "found";
          return product;
        }
      });
    }
  }

  // Searches database for product with name that corresponds with user input
  searchByName(itemName: string): Promise<ItemModel[] | null> {
    console.log("inside search input");
    
    return new Promise((resolve) => {
      var items = this.psGet.getProducts();
      items.subscribe((data: ItemModel[]) => {
        for (let item of data) {
          if (item.itemName.toUpperCase() == itemName.toUpperCase()) {
            console.log("before push");
            this.items.push(item);
            console.log("after push");
          }
        }
        resolve(this.items);
      });

    });

  }

  PassData() {
    console.log(this.items);
    this.sv.allPassedData.next(this.items); // here you emit
  }

  // TODO: Search by category


  // TODO: Search by Product ID
}
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

