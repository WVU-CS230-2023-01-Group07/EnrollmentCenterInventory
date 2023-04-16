import { Component } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { inject, Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ItemModel } from './Components/LayoutComponents/product-list/item.model';

interface Item {
  itemName: string;
  shelfCapacity: number;
  itemQuantity: number;
  storageLocation: string;
  itemType: string;
  itemBarcode: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EnrollmentCenterInventory';
  firestore: Firestore = inject(Firestore)
  items$: Observable<any[]>;
  constructor(private app: FirebaseApp){
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }
}
