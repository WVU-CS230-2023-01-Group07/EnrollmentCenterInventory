import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { getDatabase, ref, set} from "firebase/database";
import { AddRemoveLayoutComponent } from "src/app/Layouts/add-remove-layout/add-remove-layout.component"

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint = "Products.json";
    constructor(private http: HttpClient){
    }

    getProduct(){
       return this.http.get<ItemModel []>(this.baseUrl + this.productsEndPoint);
    }

    //Calls isNull to find null item folder
    //Uses null folder to add new value into database
    addProduct(product:ItemModel, counter:number){
        const db = getDatabase();
        set(ref(db, `Products/${counter}`), {
            itemBarcode: product.itemBarcode,
            itemName: product.itemName,
            shelfCapacity: product.shelfCapacity,
            itemQuantity: product.itemQuantity,
            storageLocation: product.storageLocation,
            itemType: product.itemType
        })
    }

    //Sets the ItemModel values to null
    //Implements tombstone to work around HTTP 403 error
    //ie. removing index file 0 under file 1 created Display Error
    removeProduct(number: number){
        console.log("The barcode: "+number);
        const db = getDatabase();
        set(ref(db, `Products/${number}`), {
            itemBarcode: null,
            itemName: null,
            shelfCapacity: null,
            itemQuantity:null,
            storageLocation: null,
            itemType: null
        })
    }
}
