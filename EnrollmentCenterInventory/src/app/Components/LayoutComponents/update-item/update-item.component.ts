import { Component, Input } from '@angular/core';
import { AuditModel } from 'src/app/Layouts/audit-layout/audit.model';
import { ItemsService } from '../../Common/items.service';
import { PatternValidator } from '@angular/forms';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  styleUrls: ['./update-item.component.css']
})
export class UpdateItemComponent {
  @Input() itemName: string;
  @Input() itemQuantity: string;
  @Input() storageLocation: string;
  @Input() flag: string;
  @Input() shelfCapacity: string;
  @Input() itemType: string;
  @Input() itemBarcode: string;

  constructor(private itemsService: ItemsService) {
    this.itemName = "No Item Name Found";
    this.itemQuantity = "No Quantity Found";
    this.storageLocation = "No Storage Location Found";
    this.flag = "false";
    this.shelfCapacity = "No capacity found";
    this.itemType = "No type found";
    this.itemBarcode = "No Barcode found";
  }

  ngOnInit(): void {

  }

  submitChanges(product: AuditModel) {
    const pattern = new PatternValidator;
    if (product.itemQuantity == '') {
      product.itemQuantity = this.itemQuantity;
    }
    if (product.storageLocation == '') {
      product.storageLocation = this.storageLocation;
    }
    if (product.shelfCapacity == '') {
      product.shelfCapacity = this.shelfCapacity;
    }
    if (product.itemType == '') {
      product.itemType = this.itemType;
    }
    if (!pattern.enabled(product.itemQuantity) || !pattern.enabled(product.shelfCapacity)) {
      alert("Product Quantity and ItemQuantity must be Composed of Only Numbers");
    }
    else {
        if (product.itemQuantity > product.shelfCapacity) {
          alert("Quantity Must Not Exceed Capacity");
        }
        else {
          product.flag = "true";
          product.itemBarcode = this.itemBarcode;
          product.itemName = this.itemName;
          console.log(product);
          this.itemsService.updateProduct(product);
          console.log("sent product to service");
          window.location.reload();
        }
    }
  }

  flagControl() {
    if (this.isFlagged(this)) {
      this.unflagItem(this);
      console.log("Manually unflagged item:" + this.itemName)
    } else {
      this.flagItem(this);
      console.log("Manually flagged item:" + this.itemName)
    }
    this.itemsService.updateProduct(this);
  }

  flagItem(item: AuditModel) {
    item.flag = "true";
  }

  unflagItem(item: AuditModel) {
    item.flag = "false";
  }

  isFlagged(item: AuditModel) {
    if (item.flag == "true") {
      return true;
    } else
      return false;
  }
}
