import { Component } from '@angular/core';
import { throwError } from 'rxjs';
import { ItemsService } from 'src/app/Components/Common/items.service';
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service';
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove.service';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
import { AuditModel } from '../audit-layout/audit.model';

@Component({
  selector: 'app-update-item-layout',
  templateUrl: './update-item-layout.component.html',
  styleUrls: ['./update-item-layout.component.css']
})
export class UpdateItemLayoutComponent {
  items: AuditModel[] = [];
  item: AuditModel[] = [];
  foundItem: boolean = false;

  constructor(private ps: ItemsService) {

  }

  ngOnInit(): void {
    this.items = this.ps.getItems();
  }

  findItem(product:AuditModel){
    console.log("Searching for: " + product.itemBarcode);
    for(let item of this.items){
      if(item.itemBarcode == product.itemBarcode){
        this.foundItem = true;
        this.item.push(item);
        console.log(item);
      }
    }
  }
}
