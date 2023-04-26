import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ItemModel } from "./item.model";
import { getDatabase, ref, set, child, get, remove } from "firebase/database";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { DisplayService } from "./display.service";

@Injectable(
    {providedIn: 'root'}
)
export class ProductService{
    private baseUrl:string = "https://wvu-ec-database-default-rtdb.firebaseio.com/";
    private productsEndPoint: string = "Products/";
    
    getProductsBranch() {
        return this.http.get<ItemModel[]>(this.baseUrl + this.productsEndPoint);
    }

    /*
    @param http 
    @param Angdb
    @param disp
    */
    constructor(private http: HttpClient, private Angdb: AngularFireDatabase, private disp: DisplayService){
    }

    /* @param product
       @func alert
        Adds product to database
        Checks if barcode is already stored, throws error if so
    */
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
            itemType: product.itemType,
            itemLink: product.itemLink
        })
        alert("SUCCESS: " + product.itemQuantity + " " + product.itemName + " Is now in Inventory");
    }
    }

    // TODO: Refer to notes in word doc
    searchProduct(itemName: string) {
        //console.log(JSON.stringify(product.itemBarcode));

        let branch = this.getProductsBranch();
        for (const newKey in branch)
        {
            console.log("newKey: " + newKey);
        }
        console.log("branch: " + branch);
        const dbRef = ref(getDatabase());
        get(child(dbRef, 'Products/')).then((snapshot) => {
            if(snapshot.exists()){
                console.log(snapshot.val());
                const data = snapshot.val();

                for (const key in data) {
                    console.log(key);
                    const keyRef = ref(getDatabase(), 'Products/' + key);
                    get(child(keyRef, '/itemName')).then((snapshot2) => {
                        if (snapshot2.exists() && snapshot2.val() == itemName) {
                            console.log("snapshot2: " + snapshot2.val());
                            //createItem(snapshot.val());
                            let item = new ItemModel("1", 1, 1, "1", "1", "1", "1");
                        }
                    });

                }

            } else {
                console.log('No Quantity Available');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    /*
    @param barcode
        Deletes item from database using HttpClient, given barcode input
    */
    removeProduct(barcode: string){
        return this.http.delete( this.baseUrl + this.productsEndPoint +barcode+'.json').subscribe();
    }
}
