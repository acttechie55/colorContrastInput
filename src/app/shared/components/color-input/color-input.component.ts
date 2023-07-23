import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TransportObjectDataService } from '../../services/transport-object.data.service'

@Component({
    selector: 'app-color-input',
    templateUrl: './color-input.component.html',
    styleUrls: ['./color-input.component.scss']
})
export class ColorInputComponent implements OnInit, AfterViewInit {

    @Input() backgroundColor: string; //dictates what the background color will be in contrast to the typed input color
    @Input() smallThumbnail: boolean = false; //Triggers small thumbnail for a color input
    @Input() addBadge: boolean = false; //remove or add the accessibility badge to the input
    @Input() addPercent: boolean = false; //add percent (only for opacity inputs)
    @Input() blackWhiteColorInput: boolean = false; //Triggers the color input type where the user will receive feedback on which color text is appropriate
    @Input() regularColorInput: boolean = false; //Triggers a normal color input 
    @Input() opacityColorInput: boolean = false; //Triggers a color input where you can customize the opacity of a given color
    @Input() slimColorInput: boolean = false; //Triggers a slimmed, no badge color-input
    @Input() baseColor: string;
    @Input() colorValue: string;
    @Input() opacityValue: string; //shows opacity value (i.e. 70% = .70)
    @Input() inputTitle: string; //custom input title
    @Input() disabled = false; //make input disabled
    @Input() customButtonWrapperStyles: string; //add your own custom styles to the input badge
    @Output() updateColor = new EventEmitter(); //Event Emitter for updating the color
    @Output() updateTextColor = new EventEmitter(); //Event Emitter for producing the contrasting text color
    @Output() updateValidInputValue = new EventEmitter(); //Event Emitter for giving whether or not the input is valid
    @Input() receivedInputValueService: boolean = false;


    colorInputObject: any = {};
    validHex: boolean = false;

    // meta subscription for automation ids - PROTOTYPE ONLY
    isIdsVisible: boolean;
    idsSubscription: Subscription;

    colorBlackWhite: any;
    colorContrastPattern: any = '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$';
    opacityColorPattern: string = '^[0-9]$|^[0-9][0-9]$|^(100)$';
    receivedInputObject: any = {};
    maxlengthOpacity: number;

    form = new UntypedFormGroup({
        colorFormControl: new UntypedFormControl()
    });

    get colorFormControl() {
        return this.form.get('colorFormControl');
    }

    constructor(private transportObjectData: TransportObjectDataService) { }

    ngOnInit() {
        this.colorFormControl?.setValue(this.colorValue);

        if (this.receivedInputValueService) {
            this.transportObjectData.retrievePassedObject().subscribe(data => {
                this.receivedInputObject = data;
            });
        }
    }

    ngAfterViewInit() {
        if (this.disabled) {
            this.colorFormControl?.disable();
        }
    }

    refreshColor() {
        this.colorFormControl?.setValue(this.colorValue);
    }

    // THERE HAS TO BE A BETTER WAY TO MAKE THIS DYNAMIC
    addPrefix() {
        if (!this.colorFormControl?.value && !this.opacityColorInput) {
            this.colorFormControl?.setValue('#');
        }
    }

    //For Black/White Color Inputs
    colorSwitchEvntForColor1(colorFromdirective) {
        this.colorBlackWhite = colorFromdirective;
        this.textColor();
        this.validHexCheck();
    }

    //Emits if the there is a valid hex present or not
    validHexCheck() {
        if (this.colorFormControl.errors?.['pattern']) {
            this.validHex = false;
            this.updateValidInputValue.emit(this.validHex)
        } else {
            this.validHex = true;
            this.updateValidInputValue.emit(this.validHex)
        }
    }


    //Emits the text color
    textColor() {
        this.updateTextColor.emit(this.colorBlackWhite.contrastingTextColor);
    }

    //ngModel
    colorChange() {
        this.updateColor.emit(this.colorFormControl?.value);
    }

    colorInputObjectEE(object) {
        this.colorInputObject = object;
        this.validHexCheck();
    }

    //Switches maxlength from 3 to 2 if the user types "1" first
    maxlengthOpacityChange() {
        return (this.colorFormControl.value.startsWith('1') ? 3 : 2)
    }

    //Triggers size of thumbnail
    makeThumbnailSmall() {
        return (this.smallThumbnail ? true : false)
    }





}
