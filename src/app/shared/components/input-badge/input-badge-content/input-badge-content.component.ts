import { Component, Input } from '@angular/core';

@Component({
    selector: 'input-badge-content',
    templateUrl: './input-badge-content.component.html',
    styleUrls: ['./input-badge-content.component.scss'],
})
export class InputBadgeContentComponent {

    @Input() colorContrastObject: any = {};

    constructor() {

    }

    //If the user enters an input that is incalculable
    invalidRatio() {
        return (this.colorContrastObject.formattedRatio === 'NaN:1') ? true : false;
    }

    //At least 1 AA Level has failed
    partialFailure() {
        return (this.colorContrastObject.aaNormalText === 'FAIL' || this.colorContrastObject.aaLargeText === 'FAIL') ? true : false;
    }

    //The ratio fails both AA Levels
    completeFailure() {
        return (this.colorContrastObject.aaNormalText === 'FAIL' && this.colorContrastObject.aaLargeText === 'FAIL') ? true : false;
    }

    //The ratio returns whether it passes Level AA Normal
    aaNormalPass() {
        return this.colorContrastObject.aaNormalText === 'PASS' ? true : false;
    }

    //The ratop retirms whether it passes Level AA Large
    aaLargePass() {
        return this.colorContrastObject.aaLargeText === 'PASS' ? true : false;
    }

    //The hex value passes both normal and large AA WCAG
    completePass() {
        return (this.colorContrastObject.aaNormalText === 'PASS' && this.colorContrastObject.aaLargeText === 'PASS') ? true : false;
    }



}