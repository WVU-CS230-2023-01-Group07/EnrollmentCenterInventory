import { Component } from '@angular/core';
import { ItemModel } from "src/app/Components/LayoutComponents/product-list/item.model"
import { ReportService } from 'src/app/Components/LayoutComponents/product-list/item-report.service';

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
    
    constructor(private ReportService:ReportService){}

    //fills the array with items from the Firebase Realtime Database
    ngOnInit(): void {
      this.ReportService.getItems().subscribe((data1:ItemModel []) => {
        for (var item of data1){
          this.items.push(item);
        }
      }); 
    }


    //what the buttons call to toggle of different properties are included
    toggleName(): void{ this.itemName = !this.itemName; console.log(this.itemName);}
    toggleCapacity(): void{ this.shelfCapacity = !this.shelfCapacity; }
    toggleQuantity(): void{ this.itemQuantity = !this.itemQuantity; }
    toggleType(): void{ this.itemType = !this.itemType; }
    toggleLocation(): void{ this.storageLocation = !this.storageLocation; }


    //starts generating the report
    generate(): void{
      this.saveDataInCSV(this.filename, this.items)
    }


    //Turns an array into a string and creates a download for the user
    public saveDataInCSV(name: string, data: Array<any>): void {

      let csvContent = this.generateCSV(data);
  
      //creates a download
      var hiddenElement = document.createElement('a');
      hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
      hiddenElement.target = '_blank';
      hiddenElement.download = name + '.csv';
      hiddenElement.click();
    }

    
    //converts a array to a CSV file 
    public generateCSV(data: Array<any>): string {

      // guard condition
      if (data.length == 0) {
        return '';
      }
  
      //creates the top row of names for the columns
      var propertyNames: any[] = [];
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

          // console.log("key: " + key+ "Value: " + val);
    
          if (val !== undefined && val !== null) {
            val = new String(val);
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


    //used to tell if the user wants an attribute included in the file
    public includeAttribute(value: String): boolean{
      if (value == "itemName" && this.itemName == false){  return false;  }
      if (value == "itemQuantity" && this.itemQuantity == false){  return false;  }
      if (value == "itemType" && this.itemType == false){  return false;  }
      if (value == "shelfCapacity" && this.shelfCapacity == false){  return false;  }
      if (value == "storageLocation" && this.storageLocation == false){  return false;  }
      return true
    }
}
