import { HttpClient, HttpHeaders } from "@angular/common/http";
import{Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { getDatabase, ref, set, push, child, update, get, onValue } from "firebase/database";
import { getFirestore } from "@firebase/firestore";
import { item_list } from "./item_list";
// import { getAuth } from "firebase-admin/auth";

console.log("test");

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint:string = "Products.json";

    getProductBranch() {
        return this.http.get<ItemModel []>(this.baseUrl + this.productsEndPoint);
    }

    constructor(private http: HttpClient){

    }

    getProduct(product:ItemModel){
        console.log(JSON.stringify(product.itemBarcode));
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'Products/' + product.itemBarcode)).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                this.removeProduct(product);
            } else {
                console.log('No Quantity Available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    // TODO: Refer to notes in word doc
    searchProduct(itemName: string) {
        //console.log(JSON.stringify(product.itemBarcode));

        let branch = this.getProductBranch();
        for (const newKey in branch)
        {
            console.log("newKey: " + newKey);
        }
        console.log("branch: " + branch);
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'Products/')).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                const data = snapshot.val();

                for (const key in data) {
                    console.log(key);
                    const keyRef = ref(getDatabase(), 'Products/' + key);
                    get(child(keyRef, '/itemName')).then((snapshot2) => {
                        if (snapshot2.exists() && snapshot2.val() == itemName) {
                            console.log("snapshot2: " + snapshot2.val());
                            //createItem(snapshot.val());
                            let item = new ItemModel("1", 1, 1, "1", "1", "1");
                        }
                    });

                }

            } else {
                console.log('No Quantity Available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    addProduct(product:ItemModel){
        const db = getDatabase();
        set(ref(db, `Products/${product.itemBarcode}`), {
            barcode: product.itemBarcode,
            name: product.itemName,
            capacity: product.shelfCapacity,
            quantity: product.itemQuantity,
            storage: product.storageLocation,
            classification: product.itemType
        })

        // .subscribe(data => {
        //     if (!alert("Contract created successfully")) {
        //        this.addForm.reset();
        //     }
    }

    removeProduct(product:ItemModel){
        this.http.delete('https://wvu-ec-database-default-rtdb.firebaseio.com/Products/' + product.itemBarcode +'.json')
        .subscribe();
    }


}
