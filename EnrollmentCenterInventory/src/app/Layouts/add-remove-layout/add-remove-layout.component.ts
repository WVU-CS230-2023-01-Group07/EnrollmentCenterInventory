import { Component, OnInit } from '@angular/core';
import { ItemModel } from "src/app/Components/LayoutComponents/product-list/item.model"
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove-service';
import { HttpClient } from '@angular/common/http';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms'
// import { getDatabase } from 'firebase-admin/database';

@Component({
  selector: 'app-add-remove-layout',
  templateUrl: './add-remove-layout.component.html',
  styleUrls: ['./add-remove-layout.component.css']
})
export class AddRemoveLayoutComponent implements OnInit{
    blankFlag = true;
    addFlag = false;
    itemInfo: ItemModel | undefined;

    barcode = new FormControl('');
    name = new FormControl('');
    type = new FormControl('');
    quantity = new FormControl('');
    capacity = new FormControl('');
    location = new FormControl('');
    // link = new FormControl('');
    remove = new FormGroup({
      itemBarcode: this.barcode
    });

    add = new FormGroup({
      itemBarcode: this.barcode,
      itemName: this.name,
      itemType: this.type,
      itemQuantity: this.quantity,
      shelfCapacity: this.capacity,
      storageLocation: this.location
    });

    constructor(private ps: ProductService){   }

    ngOnInit() {
      // this.add.addControl("itemBarcode",this.barcode);
      this.createFormControls();
      this.createForm();
    }

    createFormControls() {
      this.barcode = new FormControl('', Validators.required);
      this.name = new FormControl('', Validators.required);
      this.type = new FormControl('', Validators.required);
      this.quantity = new FormControl('', Validators.required);
      this.capacity = new FormControl('', Validators.required);
      this.location = new FormControl('', Validators.required);
      // this.email = new FormControl('', [
      //   Validators.required,
      //   Validators.pattern("[^ @]*@[^ @]*")
      // ]);
      // this.password = new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(8)
      // ]);
      // this.language = new FormControl('');
    }

    createForm() {
      this.add = new FormGroup({
          itemBarcode: this.barcode,
          itemName: this.name,
          itemType: this.type,
          itemQuantity: this.quantity,
          shelfCapacity: this.capacity,
          storageLocation: this.location
      });
      this.remove = new FormGroup({
        itemBarcode: this.barcode
    });
    }

    isAdd(selection: string){
      if(selection == 'blank'){
        this.blankFlag = true;
      } else{
        this.blankFlag = false;
        if(selection == 'Add'){
          this.addFlag = true;
        } else{
          this.addFlag = false;
        }
      }
      console.log("The blankFlag: " + this.blankFlag)
      console.log("The addFlag: " + this.addFlag)
    }

    addItem(product:ItemModel){
      console.log(this.add.valid);
      console.log("Adding Item: " + JSON.stringify(product));
      this.ps.addProduct(product);
      this.add.reset();
    }

    removeItem(product:ItemModel){
      console.log("Removing Item: " + JSON.stringify(product));
      this.ps.removeProduct(product)
      this.remove.reset();
    }

    adjustItem(product:ItemModel){
      console.log("Adjusting product: " + product.itemQuantity);
      // this.ps.adjustProduct(product)
    }
}
