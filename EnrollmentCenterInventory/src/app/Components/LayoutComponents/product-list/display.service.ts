import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';

@Injectable(
    {providedIn: 'root'}
)

//class used in Home Layout
export class DisplayService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    //items located on database at endpoint "Products"
    private ProductsEndPoint:string = "Products.json";

    //Http Client currently used, will be changing to angular firebase connection
    constructor(private http:HttpClient) {
        
    }

    //returns entire array of items in the database
    getProduct() {
        return this.http.get<ItemModel []>(this.baseUrl + this.ProductsEndPoint);
    }
}