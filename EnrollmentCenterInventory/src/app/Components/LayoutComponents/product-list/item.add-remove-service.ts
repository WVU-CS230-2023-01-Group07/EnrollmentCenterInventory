import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { getDatabase, ref, set} from "firebase/database";

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint = "Products.json";
    private counter = 0;
    constructor(private http: HttpClient){
    }

    // ngOnInit(): void{

    // }

    getProduct(){
       return this.http.get<ItemModel>(this.baseUrl + this.productsEndPoint);
    }

    addProduct(product:ItemModel){
        const db = getDatabase();
        set(ref(db, `Products/${this.counter}`), {
            barcode: product.itemBarcode,
            name: product.itemName,
            capacity: product.shelfCapacity,
            quantity: product.itemQuantity,
            storage: product.storageLocation,
            classification: product.itemType
        })
        this.counter++;
    }

    removeProduct(barcode:ItemModel["itemBarcode"]){
        // console.log("The barcode: "+barcode);
        const item = this.getProduct();
        const item2 = this.getProduct();
        console.log(JSON.stringify(item) + " " + item2)
        // this.http.delete('https://wvu-ec-database-default-rtdb.firebaseio.com/Products/' + product +'.json')
        // .subscribe();
    }
}
