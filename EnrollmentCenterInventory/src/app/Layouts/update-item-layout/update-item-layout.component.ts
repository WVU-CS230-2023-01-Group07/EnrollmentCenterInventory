import { Component } from '@angular/core';
import { ItemsService } from 'src/app/Components/Common/items.service';
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
