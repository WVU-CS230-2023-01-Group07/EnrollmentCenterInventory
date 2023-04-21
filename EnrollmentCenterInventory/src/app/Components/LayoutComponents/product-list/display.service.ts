import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "src/app/app.module";
import { Observable } from "rxjs";
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';

@Injectable(
    {providedIn: 'root'}
)

//class used in Home Layout
export class DisplayService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    //items located on database at endpoint "Products"
    private ProductsEndPoint:string = "Products.json";
    products: ItemModel[] = [];
    items: Observable<ItemModel []>
    //Http Client currently used, will be changing to angular firebase connection
    constructor(private http:HttpClient, private db: AngularFireDatabase) {
        this.items = this.db.list<ItemModel>('Products').valueChanges();
    }

    //returns entire array of items in the database
    getProduct() {
        this.items.subscribe((data: ItemModel []) => {
            console.log("Data received");
            for(let item of data){
                this.products.push(item);
            }
        })
        return this.products;
        // return this.db.list<ItemModel>(this.baseUrl + this.ProductsEndPoint);
    }
}