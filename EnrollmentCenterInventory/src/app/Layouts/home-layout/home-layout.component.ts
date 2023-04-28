//Items are displayed on the Home page of the app using DisplayService

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model'
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html'
})


export class HomeLayoutComponent implements OnInit{
  items: ItemModel [] = [];
  mybutton = document.getElementById("topbtn");

  constructor(private DisplaysService:DisplayService, public myElement: ElementRef){
    this.items = this.DisplaysService.getProduct();
  }

  top(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  
  ngOnInit() {

  }
}