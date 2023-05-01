import { Component } from '@angular/core';
import { ItemModel } from "src/app/Components/LayoutComponents/product-list/item.model"
import { DisplayService } from 'src/app/Components/LayoutComponents/product-list/display.service'


@Component({
  selector: 'app-report-layout',
  templateUrl: './report-layout.component.html',
  styleUrls: ['./report-layout.component.css']
})
export class ReportLayoutComponent {

    filename = "Report"
    items: ItemModel [] = [];

    itemName: boolean = true;
    shelfCapacity: boolean = true;
    itemQuantity: boolean = true;
    itemType: boolean = true;
    storageLocation: boolean = true;

    constructor(private DisplaysService:DisplayService){
      this.items = this.DisplaysService.getProduct();
    }

    //what the buttons call to toggle if different properties are included
    toggleName(): void{ this.itemName = !this.itemName; }
    toggleCapacity(): void{ this.shelfCapacity = !this.shelfCapacity; }
    toggleQuantity(): void{ this.itemQuantity = !this.itemQuantity; }
    toggleType(): void{ this.itemType = !this.itemType; }
    toggleLocation(): void{ this.storageLocation = !this.storageLocation; }


    /**
    * Generates a report that will be automatically downloaded
    */
    generate(): void{

      try {

        this.downloadCSV(this.filename, this.items)

      } catch (error) {

        //inform the user that something went wrong
        alert("There was an issue with generating and downloading your report. Please try again.");

      }
    }


    /**
    * Turns an array into a string and creates a download for the user
    * @param name - name of the file that will be downloaded
    * @param data - the array that will be downloaded as a CSV
    */
    private downloadCSV(name: string, data: Array<any>): void {

      let csvContent = this.arrayToCSV(data);
  
      if(csvContent == ''){
        
        //inform the user that there was nothing found in the database
        alert("No items were found in the database. Please ensure that at least one item has been added and try again.");

      }else{

        //creates a download
        let hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
        hiddenElement.target = '_blank';
        hiddenElement.download = name + '.csv';
        hiddenElement.click();

      }
    }

    /**
    * Converts a array to a CSV file while skipping over any toggled off elements
    * @param data - array that will be converted
    */
    private arrayToCSV(data: Array<any>): string {

      // guard condition for an empty array
      if (data.length == 0) {
        return '';
      }
  
      //creates the top row of names for the columns
      let propertyNames: any[] = [];
      for (let key of Object.keys(data[0])) {

        //Skips over the key if it was toggled off
        if (!this.includeAttribute(key)){  
          continue;
        }

        propertyNames.push(key)
      }
      let rowWithPropertyNames = propertyNames.join(',') + '\n';
  
      let csvContent = rowWithPropertyNames;
      let rows: string[] = [];
  
      data.forEach((item) => {

        let values: string[] = [];

        for (let key of propertyNames) {

          //Skips over the key if it was toggled off
          if (!this.includeAttribute(key)){  
            continue;  
          }
      
          let val: any = item[key];

          if (val !== undefined && val !== null) {
            val = String(val);
          } else {
            val = '';
          }
          values.push(val);
      
        };

        rows.push(values.join(','));

      });

      csvContent += rows.join('\n');
  
      return csvContent;
    }


    /**
    * Used to tell if the user wants an attribute included in the file
    * @param value - string of the attribute thats being checked
    */
    private includeAttribute(value: string): boolean{

      if(value == "flag") return false;

      if (value == "itemName" ) return this.itemName;  
      if (value == "itemQuantity" ) return this.itemQuantity;
      if (value == "itemType" ) return this.itemType;
      if (value == "shelfCapacity" ) return this.shelfCapacity; 
      if (value == "storageLocation" ) return this.storageLocation; 

      return true
      
    }
}
