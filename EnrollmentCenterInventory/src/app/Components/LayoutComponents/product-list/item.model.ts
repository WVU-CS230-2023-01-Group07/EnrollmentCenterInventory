export class ItemModel {
    itemName: string;
    shelfCapacity: number;
    itemQuantity: number;
    storageLocation: string;
    itemType: string;
    itemBarcode: string;

    constructor(itemName: string, shelfCapacity: number, itemQuantity: number, storageLocation: string, itemType: string, itemBarcode: string){
        this.itemName =itemName;
        this.shelfCapacity =shelfCapacity;
        this.itemQuantity =itemQuantity;
        this.storageLocation =storageLocation;
        this.itemType =itemType;
        this.itemBarcode =itemBarcode;
    }
}