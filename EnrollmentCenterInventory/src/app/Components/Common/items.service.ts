import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable} from "rxjs";
import { Injectable } from "@angular/core";
import { getDatabase, ref, set} from "firebase/database";
import { AuditModel } from "src/app/Layouts/audit-layout/audit.model";

@Injectable(
    {providedIn: 'root'}
)

/**
 * @author Ray King
 * @classdesc Service for receiving and updating items for Auditing
 */
export class ItemsService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint = "Products.json";
    private products: AuditModel[] = [];
    private items: Observable<AuditModel []>

    constructor(private db: AngularFireDatabase){
        this.items = this.db.list<AuditModel>('Products').valueChanges();
    }


    /**
     * @returns list of products in database
     * @summary retrieves list of items from database and places in array
     */
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

    
    /**
     * @param product Product from database
     * @summary Updates products' attributes in database
     */
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

