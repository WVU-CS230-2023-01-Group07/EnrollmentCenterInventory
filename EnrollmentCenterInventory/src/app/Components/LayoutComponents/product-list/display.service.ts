import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';

@Injectable(
    {providedIn: 'root'}
)
export class DisplayService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private ProductsEndPoint:string = "Products.json";

    constructor(private http:HttpClient) {
        
    }

    getProduct() {
        return this.http.get<ItemModel []>(this.baseUrl + this.ProductsEndPoint);
    }
}