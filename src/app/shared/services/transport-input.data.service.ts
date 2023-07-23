import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TransportInputValueService {

    // Observable string source
    private dataStringSource = new BehaviorSubject<string>('');

    // Observable string stream
    dataString$ = this.dataStringSource.asObservable();

    // Service message commands
    insertData(data: string) {
        this.dataStringSource.next(data);
    }

    //Example: What to place in your origin component:
    // setSharedValue(value){ 
    //   this.transportInputData.insertData(value);
    // }

    //Example: What to place in destination Component:
    // this.transportInputData.dataString$.subscribe(data => {this.receivedData = data; });


}