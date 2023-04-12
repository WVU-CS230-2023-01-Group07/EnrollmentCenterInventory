import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { getDatabase, ref, set} from "firebase/database";

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/Products.json";
    private productsEndPoint = "Products";

    constructor(private http: HttpClient){
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
    }

    removeProduct(product:ItemModel){
        this.http.delete('https://wvu-ec-database-default-rtdb.firebaseio.com/Products/' + product.itemBarcode +'.json')
        .subscribe();
    }
}
