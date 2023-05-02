import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Observable } from "rxjs";
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';

@Injectable(
    {providedIn: 'root'}
)

//class used in Home Layout
export class DisplayService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private ProductsEndPoint:string = "Products.json";
    products: ItemModel[] = [];
    items: Observable<ItemModel []>;

    /**
        Constructor uses AngularFireDatabase to grab all items from firebase under the parent folder 'Products'
        Stores the list of class ItemModel in an Observable of class ItemModel Array
            @param db: AngularFireDatabase
            @property items: Observable<ItemModel []>
    **/
    constructor(private db: AngularFireDatabase) {
        this.items = this.db.list<ItemModel>('Products').valueChanges();
    }

    /**
    returns entire array of items in the database
        @param data : ItemModel []
    **/
    getProduct() {
        this.items.subscribe((data: ItemModel []) => {
            console.log("Data received");
            this.products.splice(0);
            for(let item of data){
                this.products.push(item);
            }
        })
        return this.products;
    }

    /**
    returns an Observable of type ItemModel Array
        @method getProducts
    **/
    getProducts() {
        return this.items;
    }
}