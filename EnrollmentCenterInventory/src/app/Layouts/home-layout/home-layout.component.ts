import { Component } from '@angular/core';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model'
import { item_list } from 'src/app/Components/LayoutComponents/product-list/item_list'

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {
  items: ItemModel [] = [];

  constructor(){
    for (var item of item_list){
      console.log(item);
      this.items.push(item);
    }
  }
}
