import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ItemModel } from 'src/app/Components/LayoutComponents/product-list/item.model';
@Injectable({
    providedIn: 'root'
})
export class SearchService {
    allPassedData: BehaviorSubject<ItemModel[]> = new BehaviorSubject<ItemModel[]>([]);
    constructor() {
        console.log(this.allPassedData);
     }

    storePassedObject(passedData: ItemModel[]) {
        console.log(passedData);
        this.allPassedData.next(passedData);
       
    }

    retrievePassedObject() {
        return this.allPassedData.asObservable;
        
    }
}
