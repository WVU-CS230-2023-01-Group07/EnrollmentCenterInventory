import { HttpClient} from "@angular/common/http";
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
    private productsEndPoint: string = "Products.json";

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
