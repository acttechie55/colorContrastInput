import { Component, Input } from '@angular/core';

@Component({
    selector: 'popup-content',
    templateUrl: './popup-content.component.html',
    styleUrls: ['./popup-content.component.scss'],
})
export class PopupContentComponent {

    @Input() customContentClasses: string[];
    @Input() customPopupContentType: string;

    // Purpose: Function to more easily manage the popup content's components on various pages. 
    // To implement, call the customPopupContentType property on the <popup-content> component. Then, create an Input() on the the parent of
    // the <popup-content> component and make it equal to the customPopupContentType property. This will give you access to that value in 
    // this component. Add the Input() value to the below switch component and then add your own modifications to fit your content's needs
    switchPopupContent() {
        switch (this.customPopupContentType) {
            case 'compositeWidget':
                this.customContentClasses = ['mat-body-1', 'mat-elevation-z3'];
                break;
            case 'componentWidget':
                this.customContentClasses = ['mat-body-1', 'mat-elevation-z3'];
                break;
            case 'viewMore':
                this.customContentClasses = ['mat-body-1', 'mat-elevation-z3', 'p-3'];
                break;
            default:
                //console.log('Test');

                break;
        }
        return this.customContentClasses
    }


}