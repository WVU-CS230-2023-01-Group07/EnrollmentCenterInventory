export class AuditModel {
    itemName: string;
    shelfCapacity: string;
    itemQuantity: string;
    storageLocation: string;
    itemType: string;
    itemBarcode: string;
    flag: string;

    constructor(itemName: string, shelfCapacity: string, itemQuantity: string, storageLocation: string, itemType: string, itemBarcode: string, flag: string){
        this.itemName =itemName;
        this.shelfCapacity =shelfCapacity;
        this.itemQuantity =itemQuantity;
        this.storageLocation =storageLocation;
        this.itemType =itemType;
        this.itemBarcode =itemBarcode;
        this.flag = flag;
    }
}