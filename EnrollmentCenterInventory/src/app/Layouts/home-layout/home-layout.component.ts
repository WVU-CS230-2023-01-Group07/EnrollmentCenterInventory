import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model'
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'
import { item_list } from 'src/app/Components/LayoutComponents/product-list/item_list'

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent implements OnInit{
  items: ItemModel [] = [];

  constructor(private DisplaysService:DisplayService){
  }

  ngOnInit(): void {
    this.DisplaysService.getProduct().subscribe((data1:ItemModel []) => {
      for (var item of data1){
        console.log(item);
        this.items.push(item);
      }
    }); 
  }
}