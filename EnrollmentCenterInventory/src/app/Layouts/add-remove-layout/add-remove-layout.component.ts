//Interacts with Add/Remove Layout to add or remove products from firebase database

import { Component, OnInit } from '@angular/core';
import { ItemModel } from "src/app/Components/LayoutComponents/product-list/item.model"
import { ProductService } from 'src/app/Components/LayoutComponents/product-list/item.add-remove-service';
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms'

@Component({
  selector: 'app-add-remove-layout',
  templateUrl: './add-remove-layout.component.html',
  styleUrls: ['./add-remove-layout.component.css']
})
export class AddRemoveLayoutComponent implements OnInit {
  constructor(private ps: ProductService, private psGet: DisplayService) { }
  
  ngOnInit(): void {
    //Logs changes in realtime in Add-Remove page
    this.add.valueChanges.subscribe(x => {
      console.log(x);
    });

  }
  blankFlag = true;
  addFlag = false;

  //Searches for tombstone to fill null file in database
  //Otherwise, will give maximum value for new folder
  isNull() {
    //Counter to find Null value
    var counter = 0;
    this.psGet.getProduct().subscribe((data: ItemModel[]) => {
      for (var items of data) {
        if (items.itemBarcode == null) {
          break;
        }
        counter++;
      }
    })
    return counter;
  }

  //Remove Form Group 
    //For form Validation for button enabling
  remove = new FormGroup({
    itemBarcode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('([a-zA-z0-9-_]+)')])
  });

  //Add Form Group 
    //For form Validation for button enabling
  add = new FormGroup({
    itemBarcode: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern('([a-zA-z0-9-_]+)')]),
    itemName: new FormControl('', [Validators.required, Validators.pattern('([a-zA-Z0-9]+(?:\s*[-A-Za-z0-9])*)+'), Validators.maxLength(20)]),
    itemType: new FormControl('', [Validators.required, Validators.pattern('([a-zA-z0-9-]+)')]),
    itemQuantity: new FormControl(undefined, [Validators.required, Validators.pattern('([1-9]+[0-9]*)')]),
    shelfCapacity: new FormControl(undefined, [Validators.required, Validators.pattern('([1-9]+[0-9]*)')]),
    storageLocation: new FormControl('', [Validators.required, Validators.pattern('([a-zA-z0-9-]+)')])
  });

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
    //Gets newItem values from add FormGroup
    const quantity = this.add.value.itemQuantity;
    const capacity = this.add.value.shelfCapacity;
    const name = this.add.value.itemName;
    const storage = this.add.value.storageLocation;
    const barcode = this.add.value.itemBarcode;
    const type = this.add.value.itemType;

    //Counter finds file to insert new item
    const counter = this.isNull();

    if (this.add.valid && capacity != null && quantity != null && name != null && storage != null && barcode != null && type != null) {
      //create new ItemModel with new values
      const products = new ItemModel(name, capacity, quantity, storage, type, barcode)

      if (capacity < quantity) {
        alert("ERROR: Item Quantity Cannot Exceed Item Capacity")//ERROR CATCH
      }
      else {
        this.ps.addProduct(products, counter);
        this.add.reset();
        alert("SUCCESS: " + quantity + " " + name + " Is now in Inventory");
      }
    }
     else {
      alert("ERROR: Item was not added to Inventory");//ERROR CATCH
    }
  }

  //Removes items from database upon user interaction through add/remove layout
  removeItem() {
    const barcode = this.remove.value.itemBarcode;
    var flag = false;

    if (this.remove.valid && barcode != null && barcode != '') {

      this.psGet.getProduct().subscribe((data: ItemModel[]) => {
        let counter = 0;
        for (var items of data) {
          //COMPARE input Barcode with Database Barcode
          if (items.itemBarcode == barcode) {
            this.ps.removeProduct(counter);
            flag = true;
            break;
          }
          counter++;
        }
      });

    }
    if (flag == false) {
      alert("ERROR: Item not found");
    } else {
      alert("SUCCESS: Item removed");
    }
    this.remove.reset();
  }
}
