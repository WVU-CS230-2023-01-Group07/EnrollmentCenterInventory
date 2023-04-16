import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getDatabase, ref, set} from "firebase/database";
import { AuditModel } from "src/app/Layouts/audit-layout/audit.model";

@Injectable(
    {providedIn: 'root'}
)
export class ItemsService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint = "Products.json";
    private counter = 0;
    constructor(private http: HttpClient){
    }


    getItems(){
       return this.http.get<AuditModel[]>(this.baseUrl + this.productsEndPoint);
    }

    addProduct(product:AuditModel){
        const db = getDatabase();
        if(this.counter > 100){
            
        }
        set(ref(db, `Products/${this.counter}`), {
            itemBarcode: product.itemBarcode,
            itemName: product.itemName,
            shelfCapacity: product.shelfCapacity,
            itemQuantity: product.itemQuantity,
            storageLocation: product.storageLocation,
            itemType: product.itemType,
            flag: product.flag
        })
        this.counter++;
    }

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

