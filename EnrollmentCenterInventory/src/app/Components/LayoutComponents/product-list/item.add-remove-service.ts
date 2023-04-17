import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { getDatabase, ref, set, push, child, update, get, onValue } from "firebase/database";
import { getFirestore } from "@firebase/firestore";
// import { getAuth } from "firebase-admin/auth";

console.log("test");

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint: string = "Products.json";

    getProductsBranch() {
        return this.http.get<ItemModel[]>(this.baseUrl + this.productsEndPoint);
    }

    constructor(private http: HttpClient){

    }

    //Calls isNull to find null item folder
    //Uses null folder to add new value into database
    addProduct(product:ItemModel, counter:number){
        const db = getDatabase();
        set(ref(db, `Products/${counter}`), {
            flag: false,
            itemBarcode: product.itemBarcode,
            itemName: product.itemName,
            shelfCapacity: product.shelfCapacity,
            itemQuantity: product.itemQuantity,
            storageLocation: product.storageLocation,
            itemType: product.itemType
        })
    }

    removeProduct(number:number){
        const db = getDatabase();
        set(ref(db, `Products/${number}`), {
            flag: null,
            itemBarcode: null,
            itemName: null,
            shelfCapacity: null,
            itemQuantity:null,
            storageLocation: null,
            itemType: null
        })
    }


}
