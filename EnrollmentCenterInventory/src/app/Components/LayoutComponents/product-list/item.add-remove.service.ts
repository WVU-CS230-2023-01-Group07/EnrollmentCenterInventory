import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { getDatabase, ref, set} from "firebase/database";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { DisplayService } from "./display.service";

@Injectable(
    {providedIn: 'root'}
)
/**
 * @author Andrew DeGarmo
 * Service communicates with add-remove-layout.component.ts \
 * adding or removing an item from the database
 */
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint: string = "Products/";
    
    getProductsBranch() {
        return this.http.get<ItemModel[]>(this.baseUrl + this.productsEndPoint);
    }

    /**
    @param http : HttpClient
    @param Angdb : AngularFireDatabase
    @param disp : DisplayService
    **/
    constructor(private http: HttpClient, private Angdb: AngularFireDatabase, private disp: DisplayService){
    }

    /**
      Adds product to database
      Checks if barcode is already stored, throws error if so
       @param product
       @func alert
    **/
    addProduct(product:ItemModel){
        const db = getDatabase();
        var products = this.disp.getProduct();
        var existFlag = false;
        for(let item of products){
            if(item.itemBarcode == product.itemBarcode){
                existFlag = true;
            }
        }
        if(existFlag == true){
            alert("Barcode Already Exists!\nAll Items Must have a Unique Barcode.");//ERROR CATCH
        } else{
        set(ref(db, `Products/` + product.itemBarcode), {
            flag: false,
            itemBarcode: product.itemBarcode,
            itemName: product.itemName,
            shelfCapacity: product.shelfCapacity,
            itemQuantity: product.itemQuantity,
            storageLocation: product.storageLocation,
            itemType: product.itemType
        })
        alert("SUCCESS: " + product.itemQuantity + " " + product.itemName + " Is now in Inventory");
    }
    }

    /**
    @param barcode
    @property http: HttpClient
        Deletes item from database using HttpClient, given barcode input
    */
    removeProduct(barcode: string){
        return this.http.delete( this.baseUrl + this.productsEndPoint +barcode+'.json').subscribe();
    }
}
