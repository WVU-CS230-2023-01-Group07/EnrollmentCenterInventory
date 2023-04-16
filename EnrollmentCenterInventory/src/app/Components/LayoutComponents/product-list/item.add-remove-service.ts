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
       return this.http.get<ItemModel[]>(this.baseUrl + this.productsEndPoint);
    }

    addProduct(product:ItemModel){
        const db = getDatabase();
        if(this.counter > 100){
            
        }
        set(ref(db, `Products/${this.counter}`), {
            itemBarcode: product.itemBarcode,
            itemName: product.itemName,
            shelfCapacity: product.shelfCapacity,
            itemQuantity: product.itemQuantity,
            storageLocation: product.storageLocation,
            itemType: product.itemType
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
        // this.http.delete('https://wvu-ec-database-default-rtdb.firebaseio.com/Products/' + number +'.json')
        // .subscribe();
    }
}
