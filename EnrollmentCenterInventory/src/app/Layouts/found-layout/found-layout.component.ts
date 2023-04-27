import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import { SearchItemsLayoutComponent } from '../search-items-layout/search-items-layout.component';
import { SearchService } from '../search-items-layout/search.service';

@Component({
  selector: 'app-found-layout',
  templateUrl: './found-layout.component.html',
  styleUrls: ['./found-layout.component.css']
})
export class FoundLayoutComponent implements OnInit {
  products!: ItemModel[];

  constructor(private sv: SearchService) {
  }


  ngOnInit() {
    this.sv.allPassedData.subscribe((allPassedData) => {
      this.products = allPassedData;
      console.log(allPassedData);
      console.log(this.products); // print the data
    })
  }




  // foundProduct() {
  //   let product = this.sl.storeInput;
  //   return product;
  // }
}
