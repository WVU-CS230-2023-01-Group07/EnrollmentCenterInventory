import { Component, Input } from '@angular/core';
import { AuditModel } from 'src/app/Layouts/audit-layout/audit.model';
import { ItemsService } from 'src/app/Components/Common/items.service';
import { PatternValidator } from '@angular/forms';

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

  constructor(private itemsService: ItemsService) {
    this.itemName = "No Item Name Found";
    this.itemQuantity = "No Quantity Found";
    this.storageLocation = "No Storage Location Found";
    this.flag = "false";
    this.shelfCapacity = "No Capacity Found";
    this.itemType = "No type found";
    this.itemBarcode = "No Barcode found";
  }

  ngOnInit(): void {

  }

  submitChanges(product: AuditModel) {
    const pattern = new PatternValidator;
    console.log("Is it Validated? " + pattern.enabled(product.itemQuantity));
    if (product.itemQuantity == '') {
      product.itemQuantity = this.itemQuantity;
    }
    if (product.storageLocation == '') {
      product.storageLocation = this.storageLocation;
    }
    if (!pattern.enabled(product.itemQuantity)) {
      alert("Item Quantity Must be Composed of Only Numbers");
    }
    else {
      if (product.itemQuantity > this.shelfCapacity) {
        alert("Quantity Must Not Exceed Capacity");
      }
      else {
        product.itemName = this.itemName;
        product.flag = "true";
        product.shelfCapacity = this.shelfCapacity;
        product.itemType = this.itemType;
        product.itemBarcode = this.itemBarcode;
        this.itemsService.updateProduct(product);
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
