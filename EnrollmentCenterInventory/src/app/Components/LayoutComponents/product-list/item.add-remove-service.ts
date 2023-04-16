import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { getDatabase, ref, set, child, get } from "firebase/database";

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint: string = "Products.json";

    constructor(private http: HttpClient){

    }

    getProduct(product:ItemModel){
        console.log(JSON.stringify(product.itemBarcode));
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'Products/' + product.itemBarcode)).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                // this.removeProduct(product);
            } else {
                console.log('No Quantity Available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // getProduct(product:ItemModel){
    //     console.log(JSON.stringify(product.itemBarcode));
    //     const dbRef = ref(getDatabase());
    //     get(child(dbRef, 'Products/' + product.itemBarcode)).then((snapshot) => {
    //         if(snapshot.exists()){
    //             console.log(snapshot.val());
    //             this.removeProduct(product);
    //         } else {
    //             console.log('No Quantity Available');
    //         }
    //     }).catch((error) => {
    //         console.error(error);
    //     });
    // }

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

    //Sets the ItemModel values to null
    //Implements tombstone to work around HTTP 403 error
    //ie. removing index file 0 under file 1 created Display Error
    removeProduct(number: number){
        console.log("The barcode: "+number);
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
