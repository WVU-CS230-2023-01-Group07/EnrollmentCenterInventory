//Items are displayed on the Home page of the app using DisplayService

import { Component, OnInit } from '@angular/core';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model'
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})


export class HomeLayoutComponent implements OnInit{
  items: ItemModel [] = [];


  constructor(private DisplaysService:DisplayService){
    this.items = this.DisplaysService.getProduct();
  }

  ngOnInit(): void {
    //retrieves array of items from database
    // this.DisplaysService.getProduct().subscribe((data1:ItemModel []) => {
    //   //for loop pushes all items to HTML file
    //   for (var item of data1){
    //     console.log(item);
    //     //"item" is counter, starting at 0 and ending at number of items in data1
    //     this.items.push(item);
    //   }
    // }); 
  }
}