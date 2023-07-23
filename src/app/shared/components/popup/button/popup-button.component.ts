import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
        selector: 'popup-button',
        templateUrl: './popup-button.component.html',
        styleUrls: ['./popup-button.component.scss'],
        host: { class: 'd-flex flex-grow-1' }
})
export class PopupButtonComponent {
        @Output() popupButtonClicked = new EventEmitter<void>();
        @Input() customPopupButtonType: string;
        @Input() value = '';
        @Input() canCopy = true;
        matIconName: string; //Material Icon (i.e. "home" will give you the Material Icon for Home)
        buttonText: string; // Custom Button Text color
        ariaLabel: string; // Custom Aria-Label text for accessibility
        buttonColor: string; // Add your own custom button color (i.e. "primary" will produce the deep red color)
        customCSS: string;
        customStyles: string;
        buttonCategory: string;
        show = false;

        constructor() {
        }

        ngAfterContentInit() {
                this.switchPopupButton()
        }

        // Purpose: Function to more easily manage the popup button's components on various pages. 
        // To implement, call the customPopupButtonType property on the <popup-button> component. Then, create an Input() on the the parent of
        // the <popup-button> component and make it equal to the customPopupButtonType property. This will give you access to that value in 
        // this component. Add the Input() value to the below switch component and then add your own modifications to fit your button's needs
        switchPopupButton() {
                switch (this.customPopupButtonType) {
                        case 'inputBadgeRight':
                                this.buttonCategory = 'inputBadge';
                                this.customCSS = 'p-0 position-absolute input-badge-button-container top-right';
                                this.customStyles = 'bottom: 20px; right: -23px;';
                                this.ariaLabel = "Hover for more information"
                                break;
                        case 'inputBadgeFarRight':
                                this.buttonCategory = 'inputBadge';
                                this.customCSS = 'p-0 position-absolute';
                                this.customStyles = 'bottom: 20px; right: -36px;';
                                this.ariaLabel = "Hover for more information"
                                break;
                        case 'compositeWidget':
                                this.buttonCategory = 'iconOnly';
                                this.matIconName = "info"
                                this.ariaLabel = "More information regarding the composite widget"
                                break;
                        case 'componentWidget':
                                this.buttonCategory = 'iconOnly';
                                this.matIconName = "info"
                                this.ariaLabel = "More information regarding the component widget"
                                break;
                        case 'viewMore':
                                this.buttonCategory = 'textOnly';
                                this.ariaLabel = "Click to copy cell text"
                                this.customCSS = "button-cell"
                                break;
                        case 'iconNoCopy':
                                this.buttonCategory = 'iconNoCopy';
                                this.ariaLabel = "Box attributes"
                                break;
                        default:
                                console.log('Test');

                                break;
                }
        }


}