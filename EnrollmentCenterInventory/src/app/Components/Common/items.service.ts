import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable} from "rxjs";
import { Injectable } from "@angular/core";
import { getDatabase, ref, set} from "firebase/database";
import { AuditModel } from "src/app/Layouts/audit-layout/audit.model";

@Injectable(
    {providedIn: 'root'}
)
export class ItemsService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint = "Products.json";
    private products: AuditModel[] = [];
    private items: Observable<AuditModel []>

    constructor(private db: AngularFireDatabase){
        this.items = this.db.list<AuditModel>('Products').valueChanges();
    }


    getItems(){
        this.items.subscribe((data: AuditModel []) => {
            console.log("Data received");
            this.products.splice(0);
            for(let item of data){
                this.products.push(item);
            }
        })
        return this.products;
    }

    

    updateProduct(product:AuditModel){
        const db = getDatabase();
        set(ref(db, `Products/${product.itemBarcode}`), {
            itemBarcode: product.itemBarcode,
            itemName: product.itemName,
            shelfCapacity: product.shelfCapacity,
            itemQuantity: product.itemQuantity,
            storageLocation: product.storageLocation,
            itemType: product.itemType,
            flag: product.flag
        })
    }
}

