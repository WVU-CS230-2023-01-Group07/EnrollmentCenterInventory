import { Component, Input } from '@angular/core';
import { AuditModel } from 'src/app/Layouts/audit-layout/audit.model';
import { ItemsService } from 'src/app/Components/Common/items.service';

@Component({
  selector: 'app-audit-products',
  templateUrl: './audit-products.component.html',
  styleUrls: ['./audit-products.component.css']
})
export class AuditProductsComponent {
  @Input() itemName: string;
  @Input() itemQuantity: string;
  @Input() storageLocation: string;
  @Input() flag: string;
  @Input() shelfCapacity: string;
  @Input() itemType: string;
  @Input() itemBarcode: string;

  constructor(private itemsService:ItemsService){
    this.itemName ="No Item Name Found";
    this.itemQuantity = "No Quantity Found";
    this.storageLocation ="No Storage Location Found";
    this.flag = "false";
    this.shelfCapacity = "No capacity found";
    this.itemType = "No type found";
    this.itemBarcode = "No Barcode found";
  }

  ngOnInit(): void{

  }

  submitChanges(product:AuditModel){
    console.log("test");
    product.itemName = this.itemName;
    product.flag = this.flag;
    product.shelfCapacity = this.shelfCapacity;
    product.itemType = this.itemType;
    product.itemBarcode = this.itemBarcode;
    console.log(product);
    this.itemsService.addProduct(product);
    console.log("sent product to service")
    
  }

  flagControl(){
    console.log("flag test");
  }
}
