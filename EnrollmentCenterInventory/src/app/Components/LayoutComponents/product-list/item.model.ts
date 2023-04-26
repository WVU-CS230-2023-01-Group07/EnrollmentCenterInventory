import { RouterLink } from "@angular/router";

export class ItemModel {
    //will be adding "flag" parameter in later update
    itemName: string;
    shelfCapacity: number;
    itemQuantity: number;
    storageLocation: string;
    itemType: string;
    itemBarcode: string;
    itemLink: string | null;

    constructor(itemName: string, shelfCapacity: number, itemQuantity: number, storageLocation: string, itemType: string, itemBarcode: string, itemLink: string | null){
        this.itemName =itemName;
        this.shelfCapacity =shelfCapacity;
        this.itemQuantity =itemQuantity;
        this.storageLocation =storageLocation;
        this.itemType =itemType;
        this.itemBarcode =itemBarcode;
        this.itemLink = itemLink;
    }
}