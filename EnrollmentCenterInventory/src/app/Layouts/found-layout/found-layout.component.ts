import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import { SearchItemsLayoutComponent } from '../search-items-layout/search-items-layout.component';

@Component({
  selector: 'app-found-layout',
  templateUrl: './found-layout.component.html',
  styleUrls: ['./found-layout.component.css']
})
export class FoundLayoutComponent implements OnInit {
product = ItemModel;

  constructor(private sl: SearchItemsLayoutComponent){
  }

  ngOnInit(): void {
    //let product = this.sl.storeInput;
    console.log("product");
  }


  // foundProduct() {
  //   let product = this.sl.storeInput;
  //   return product;
  // }
}
