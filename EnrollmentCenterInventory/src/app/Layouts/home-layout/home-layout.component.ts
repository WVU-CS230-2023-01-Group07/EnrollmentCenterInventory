/**********************************************
 Items are displayed on the Home page of the app using DisplayService
  Layout uses an array of class ItemModel to display contents on html page
  Function for scrolling to the top of the page
***********************************************/

import { Component, OnInit} from '@angular/core';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model'
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html'
})


export class HomeLayoutComponent implements OnInit{
  items: ItemModel [] = [];
  mybutton = document.getElementById("topbtn");

  /**
   Uses getProduct method from display service to place 
   all items returned from method in property items
   @param DisplaysService 
   */
  constructor(private DisplaysService:DisplayService){
    this.items = this.DisplaysService.getProduct();
  }

  /** 
    Scrolls to the top of the page
      @property documentElement
      @property body
  **/
  top(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  ngOnInit() {

  }
}