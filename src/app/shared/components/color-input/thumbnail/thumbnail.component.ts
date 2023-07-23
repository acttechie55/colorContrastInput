import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-thumbnail',
    templateUrl: './thumbnail.component.html',
    styleUrls: ['./thumbnail.component.scss'],
    host: { 'style': 'align-self: flex-start' }
})
export class ThumbnailComponent {


    @Input() small: boolean = false;
    @Input() inputValue: string;
    @Input() validHex: boolean;
    @Input() tonalColor: string;
    @Input() regularThumbnail: boolean = false;
    @Input() opacityThumbnail: boolean = false;



}
