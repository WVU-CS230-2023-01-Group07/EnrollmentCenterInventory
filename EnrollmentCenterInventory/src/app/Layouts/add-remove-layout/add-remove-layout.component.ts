//Interacts with Add/Remove Layout to add or remove products from firebase database

import { Component, OnInit } from '@angular/core';
import { ItemModel } from "src/app/Components/LayoutComponents/product-list/item.model"
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-remove-layout',
  templateUrl: './add-remove-layout.component.html',
  styleUrls: ['./add-remove-layout.component.css']
})
export class AddRemoveLayoutComponent implements OnInit {
  blankFlag = true;
  addFlag = false;
  itemInfo: ItemModel | undefined;

  //Remove Form Group 
  remove = new FormGroup({
    itemBarcode: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  //Add Form Group 
  add = new FormGroup({
    itemBarcode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('([a-zA-z0-9-]+)')]),
    itemName: new FormControl('', [Validators.required, Validators.pattern('([a-zA-z0-9-]+)')]),
    itemType: new FormControl('', [Validators.required, Validators.pattern('([a-zA-z0-9-]+)')]),
    itemQuantity: new FormControl(undefined, [Validators.required, Validators.pattern('([1-9]+[0-9]*)')]),
    shelfCapacity: new FormControl(undefined, [Validators.required, Validators.pattern('([1-9]+[0-9]*)')]),
    storageLocation: new FormControl('', [Validators.required, Validators.pattern('([a-zA-z0-9-]+)')])
  });

  constructor(private ps: ProductService) { }

  ngOnInit() {
    this.add.valueChanges.subscribe(x => {
      console.log(x);
    })
  }

  // Interacts with  Adding or Removing dropdown box for add/remove layout
  // Flags:
  //  blankFlag
  //  addFlag
  isAdd(selection: string) {
    if (selection == 'blank') {
      this.blankFlag = true;
    } else {
      this.blankFlag = false;
      if (selection == 'Add') {
        this.addFlag = true;
      } else {
        this.addFlag = false;
      }
    }
  }

  //Adds items into the database
  //Once added to database, form resets to add/remove other products
  addItem() {
    console.log("Is the Form valid? " + this.add.valid)
    const quantity = this.add.value.itemQuantity;
    const capacity = this.add.value.shelfCapacity;
    const name = this.add.value.itemName;
    const storage = this.add.value.storageLocation;
    const barcode = this.add.value.itemBarcode;
    const type = this.add.value.itemType;

    if (this.add.valid && capacity != null && quantity != null && name != null && storage != null && barcode != null && type != null) {
      const products = new ItemModel(name, capacity, quantity, storage, type, barcode)
      if (capacity < quantity) {
        alert("ERROR: Item Quantity Cannot Exceed Item Capacity")
      } else {
        console.log("Adding Item: " + JSON.stringify(this.add.value));
        this.ps.addProduct(products);
        this.add.reset();
        alert("Item Added Successfully \n" + quantity + " " + name + " Is now in Inventory");
      }
    } else {
      alert("ERROR: Item was not added to Inventory");
    }
  }

  //Removes items from database upon user interaction through add/remove layout
  removeItem() {
    const barcode = this.remove.value.itemBarcode;
    console.log(barcode);
    if (this.remove.valid && barcode != null && barcode != '') {
      // const products = new ItemModel('', 0, 0, '', '', barcode.trim())
      this.ps.removeProduct(barcode);
      this.remove.reset();
      // alert("Item Removed Successfully");
    } else {
      // alert("ERROR: Item was not removed");
    }
  }
}
