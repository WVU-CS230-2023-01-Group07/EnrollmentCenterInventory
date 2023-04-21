import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { getDatabase, ref, set} from "firebase/database";
import { AngularFireDatabase } from "src/app/app.module";

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint = "Products.json";
    private ProductsRef = this.Angdb.list<ItemModel>("Products/")
    constructor(private http: HttpClient, private Angdb: AngularFireDatabase){
    }

    getProduct(){
       return this.http.get<ItemModel []>(this.baseUrl + this.productsEndPoint);
    }

    //Calls isNull to find null item folder
    //Uses null folder to add new value into database
    addProduct(product:ItemModel){
        const db = getDatabase();
        set(ref(db, `Products/${product.itemBarcode}`), {
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
    removeProduct(item: ItemModel){
        // console.log("Querying: "+ JSON.stringify(this.Angdb.object<ItemModel[]>("Products/" + item.key)));
        // function(snapshot)
        return this.http.delete('Products/' + item.itemBarcode+'.json').subscribe();
        // const db = getDatabase();
        // set(ref(db, `Products/${number}`), {
        //     flag: null,
        //     itemBarcode: null,
        //     itemName: null,
        //     shelfCapacity: null,
        //     itemQuantity:null,
        //     storageLocation: null,
        //     itemType: null
        // })
    }
}
