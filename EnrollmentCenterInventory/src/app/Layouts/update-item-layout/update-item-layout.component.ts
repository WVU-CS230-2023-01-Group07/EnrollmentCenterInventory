import { Component } from '@angular/core';
import { ItemsService } from 'src/app/Components/Common/items.service';
import { AuditModel } from '../audit-layout/audit.model';

@Component({
  selector: 'app-update-item-layout',
  templateUrl: './update-item-layout.component.html',
  styleUrls: ['./update-item-layout.component.css']
})
/**
 * @author Ray King
 * @classdesc Updates items in the inventory
 */
export class UpdateItemLayoutComponent {
  items: AuditModel[] = [];
  item: AuditModel[] = [];
  foundItem: boolean = false;

  constructor(private ps: ItemsService) {

  }

  ngOnInit(): void {
    this.items = this.ps.getItems();
  }

  /**
   * @param product item in the inventory
   * @summary finds item in the inventory based on barcode
   */
  findItem(product:AuditModel){
    console.log("Searching for: " + product.itemBarcode);
    for(let item of this.items){
      if(item.itemBarcode == product.itemBarcode){
        this.foundItem = true;
        this.item.push(item);
        console.log(item);
      }
    }
    if(this.foundItem != true){
      alert("Item Was Not Found");
    }
  }
}
