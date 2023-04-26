import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  @Input() itemName: string;
  @Input() shelfCapacity: string;
  @Input() itemQuantity: string;
  @Input() storageLocation: string;
  @Input() itemType: string;
  @Input() itemBarcode: string;
  @Input() itemLink: string | null;

  constructor(){
    this.itemName ="No Item Name Found";
    this.shelfCapacity ="No Shelf Capacity Found";
    this.itemQuantity ="No Item Quantity Found";
    this.storageLocation ="No Storage Location Found";
    this.itemType ="No Item Type Found";
    this.itemBarcode ="No Item Barcode Found";
    this.itemLink = "No Link Found";
  }
}
