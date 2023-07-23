import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransportObjectDataService {

    allPassedData: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    constructor() { }

    storePassedObject(passedData) {
        this.allPassedData.next(passedData);
    }
    // here instead of retrieve like this you can directly subscribe the property in your components
    retrievePassedObject() {
        return this.allPassedData;

    }

    //Example: What to place in your origin component:
    // setSharedValue(value){ 
    //   this.transportObjectData.insertData(value);
    // }

    //Example: What to place in destination Component:
    // this.transportObjectData.retrievePassedObject().subscribe(data => {this.receivedData = data; });

}