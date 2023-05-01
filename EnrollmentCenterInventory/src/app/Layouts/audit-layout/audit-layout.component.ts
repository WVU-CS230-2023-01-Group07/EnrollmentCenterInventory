import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/Components/Common/items.service';
import { AuditModel } from './audit.model';

@Component({
  selector: 'app-audit-layout',
  templateUrl: './audit-layout.component.html',
  styleUrls: ['./audit-layout.component.css']
})
/**
 * @author Ray King
 * @classdesc - Provides methods for auditing the items in the database
 */
export class AuditLayoutComponent {
  items: AuditModel[] = [];
  flaggedItems: AuditModel[] = [];
  showingFlagged: boolean = false;
  filename = "Audit"
  itemName: boolean = true;
  shelfCapacity: boolean = true;
  itemQuantity: boolean = true;
  itemType: boolean = true;
  storageLocation: boolean = true;

  constructor(private itemsService:ItemsService){
    
  }

  ngOnInit(): void {
    this.items = this.itemsService.getItems();
  }
  
  /**
   * @summary Toggles the state of a flag
   */
  showFlagged(){
    this.flagItems();
    if(this.showingFlagged)
      this.showingFlagged = false;
    else
    this.showingFlagged = true;
  }

  /**
   * @param item Item in the database
   * @param location User given location to modify in database
   * @summary Modifies location of item in database
   */
  editLocation(item: AuditModel, location: string){
    if (location == null){
      console.log("error: location invalid");
    }
    item.storageLocation = location;
  }

    /**
   * @param item Item in the database
   * @param location User given quantity to modify in database
   * @summary Modifies location of item in database
   */
  editQuantity(item: AuditModel, quantity: string){
    if (quantity == null){
      console.log("error: quantity invalid");
    }
    item.itemQuantity = quantity;
  }

  /**
   * @param item Item in the database
   * @summary flags item in database
   */
  flagItem(item: AuditModel){
    item.flag = "true";
    this.flagItems();
  }

    /**
   * @param item Item in the database
   * @summary unflags item in database
   */
  unflagItem(item: AuditModel){
    item.flag = "false";
    this.flagItems();
  }

  /**
   * 
   * @param item Item in the database
   * @returns boolean of flag
   * @summary Checks if an item is flagged
   */
  isFlagged(item: AuditModel){
    if (item.flag == "true"){
      return true;
    } else
      return false;
  }

  /**
   * @summary Stores items that are flagged in an array
   */
  flagItems(){
    this.flaggedItems.splice(0);
    this.items.forEach(element => {
      if(this.isFlagged(element)){
        this.flaggedItems.push(element)
      }
    });
  }

  /**
   * @summary Generates a CSV of audited items
   */
  generate(): void{
    this.saveDataInCSV(this.filename, this.items)
  }


  /**
   * @param name Name of CSV
   * @param data Array of items
   * @summary Turns an array into a string and creates a download for the user
   */
  public saveDataInCSV(name: string, data: Array<any>): void {

    let csvContent = this.generateCSV(data);

    //creates a download
    let hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }

  
  /**
   * 
   * @param data Array of items
   * @returns CSV content
   * @summary Converts a array to a CSV file 
   */
  public generateCSV(data: Array<any>): string {

    // guard condition
    if (data.length == 0) {
      return '';
    }

    //creates the top row of names for the columns
    let propertyNames: any[] = [];
    for (let key of Object.keys(data[0])) {
      if(key !== "flag"){
        propertyNames.push(key)
      }
    }
    let rowWithPropertyNames = propertyNames.join(',') + '\n';

    let csvContent = rowWithPropertyNames;
    let rows: string[] = [];

    data.forEach((item) => {
      let values: string[] = [];
      if (this.isFlagged(item)){
        for (let key of propertyNames) {
    
          let val: any = item[key];

          if (val !== undefined && val !== null && key !== "flag") {
            val = String(val);
          } else {
            val = '';
          }
          values.push(val);
        }
        rows.push(values.join(','));
      }
    });
    csvContent += rows.join('\n');
    return csvContent;
  }
}
