import { HttpClient, HttpHeaders } from "@angular/common/http";
import{Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { getDatabase, ref, set, push, child, update, get } from "firebase/database";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase-admin/auth";
import { AuditModel } from "src/app/Layouts/audit-layout/audit.model";

@Injectable(
    {providedIn: 'root'}
)
export class ItemsService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/Products.json";
    private productsEndPoint = "Products";

    constructor(private http: HttpClient){
    }

    getItems(){
        return this.http.get<AuditModel []>(this.baseUrl);
    }

    addProduct(product:AuditModel){
        const db = getDatabase();
        set(ref(db, `Products/${product.itemBarcode}`), {
            flag: product.flag,
            itemBarcode: product.itemBarcode,
            itemName: product.itemName,
            itemQuantity: product.itemQuantity,
            itemType: product.itemType, 
            shelfCapacity: product.shelfCapacity,
            storageLocation: product.storageLocation,
            
        })

        // .subscribe(data => {
        //     if (!alert("Contract created successfully")) {
        //        this.addForm.reset();
        //     }
    }

    removeProduct(product:AuditModel){
        this.http.delete('https://wvu-ec-database-default-rtdb.firebaseio.com/Products/' + product.itemBarcode +'.json')
        .subscribe();
    }
}
