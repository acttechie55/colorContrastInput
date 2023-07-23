/*To Modify Popup Button Component: ./components/popup/button/popup-button.component */
/*To Modify Popup Content Component: ./components/popup/content/popup-content.component */

import { Directive, Input, OnDestroy, OnInit, TemplateRef, AfterViewInit, Host, ViewContainerRef, HostListener } from '@angular/core';
import { ConnectionPositionPair, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PopupButtonComponent } from '../components/popup/button/popup-button.component';
import { TemplatePortal } from '@angular/cdk/portal';

@Directive({
  selector: '[popup]',
})
export class PopupDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input() popup!: TemplateRef<object>;
  @Input() label!: HTMLElement;
  private unsubscribe = new Subject();
  private overlayRef!: OverlayRef;
  @Input() customOverlayClass: string; //create custom css classes on your component for the overlay
  @Input() customPopupButtonType: string; //see more info on <popup-button> ts file

  constructor(@Host() private popupButton: PopupButtonComponent, private overlay: Overlay, private vcr: ViewContainerRef) {
  }

  ngOnInit(): void {
    this.createOverlay();
  }

  ngAfterViewInit(): void {
    this.popupButton.popupButtonClicked.asObservable().subscribe(() => {
      this.attachOverlay();
    });
  }

  ngOnDestroy(): void {
    this.detachOverlay();
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }

  private createOverlay(): void {

    //Determines how the overlay will react to scrolling outside the overlay element. Reposition means that position will update on scroll
    const scrollStrategy = this.overlay.scrollStrategies.reposition();

    //Determines how the overlay will be positioned on-screen
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.label)//Creates a flexible position strategy in relationship to that property (label)
      .withPositions([
        new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
        new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' }),
      ])
      .withPush(false);

    //Creates and Configures the Overlay Instance
    this.overlayRef = this.overlay.create({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: false, //Determines if we want a backdrop like a modal...we don't. 
    });

    //Property for when you want to add custom css classes to the overlay pane. 
    this.overlayRef.addPanelClass(this.customOverlayClass)

    this.overlayRef
      .backdropClick() //Event emitter if the user click the backdrop
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(() => {
        this.detachOverlay();
      });
  }


  private attachOverlay(): void {

    if (!this.overlayRef.hasAttached()) {
      const periodSelectorPortal = new TemplatePortal(this.popup, this.vcr);
      this.overlayRef.attach(periodSelectorPortal);
    }

  }

  //Function for when the overlay has been detached
  private detachOverlay(): void {
    if (this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

  //When the user hovers over the button, the overlay appears
  @HostListener('mouseenter')
  show() {
    this.attachOverlay()
  }
  //When the user moves away from the button, the overlay disappears
  @HostListener('mouseleave')
  hide() {
    this.detachOverlay()
  }

}