import { Component, Input } from '@angular/core';

@Component({
    selector: 'input-badge-button',
    templateUrl: './input-badge-button.component.html',
    styleUrls: ['./input-badge-button.component.scss']
})
export class InputBadgeButtonComponent {
    @Input() colorContrastObject: any = {}

    constructor() {

    }

    //If the user enters an input that is incalculable
    invalidRatio() {
        return (this.colorContrastObject.formattedRatio === 'NaN:1') ? true : false;
    }

    //If one of the color contrast ratio fails to meet either the AA Normal or AA Large
    partialFailure() {
        return (this.colorContrastObject.aaNormalText === 'FAIL' || this.colorContrastObject.aaLargeText === 'FAIL') ? true : false;
    }

    //The hex value passes both normal and large AA WCAG
    completePass() {
        return (this.colorContrastObject.aaNormalText === 'PASS' && this.colorContrastObject.aaLargeText === 'PASS') ? true : false;
    }


}