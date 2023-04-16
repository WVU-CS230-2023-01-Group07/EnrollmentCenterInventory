import { Component, OnInit } from '@angular/core';
import { ItemsService } from 'src/app/Components/Common/items.service';
import { AuditModel } from './audit.model';

@Component({
  selector: 'app-audit-layout',
  templateUrl: './audit-layout.component.html',
  styleUrls: ['./audit-layout.component.css']
})
export class AuditLayoutComponent {
  items: AuditModel[] = [];
  flaggedItems: AuditModel[] = [];
  showingFlagged: boolean = false;

  constructor(private itemsService:ItemsService){
    
  }

  ngOnInit(): void {
    this.itemsService.getItems().subscribe((data: AuditModel []) => {
      console.log("Fetching stories");
      for (var story of data){
        console.log(data);
        this.items.push(story);
        console.log()
      }
    });
  }
  
  showFlagged(){
    this.flagItems();
    if(this.showingFlagged)
      this.showingFlagged = false;
    else
    this.showingFlagged = true;
  }

  editLocation(item: AuditModel, location: string){
    if (location == null){
      console.log("error: location invalid");
    }
    item.storageLocation = location;
  }

  editQuantity(item: AuditModel, quantity: string){
    if (quantity == null){
      console.log("error: quantity invalid");
    }
    item.itemQuantity = quantity;
  }

  flagItem(item: AuditModel){
    item.flag = "true";
    this.flagItems();
  }

  unflagItem(item: AuditModel){
    item.flag = "false";
    this.flagItems();
  }

  isFlagged(item: AuditModel){
    if (item.flag == "true"){
      return true;
    } else
      return false;
  }

  flagItems(){
    this.flaggedItems.splice(0);
    this.items.forEach(element => {
      if(this.isFlagged(element)){
        this.flaggedItems.push(element)
      }
    });
  }

}
