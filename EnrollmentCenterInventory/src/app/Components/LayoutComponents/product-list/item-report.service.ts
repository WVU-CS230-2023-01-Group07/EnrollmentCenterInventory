import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";


@Injectable(
    {providedIn: 'root'}
)
export class ReportService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint = "Products.json";

    constructor(private http:HttpClient){

    }

    getItems(){
        return this.http.get<ItemModel []>(this.baseUrl + this.productsEndPoint);
    }
}