import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatTabsModule } from '@angular/material/tabs';

import { PopupButtonComponent } from './shared/components/popup/button/popup-button.component';
import { PopupContentComponent } from './shared/components/popup/content/popup-content.component';
import { ColorInputComponent } from './shared/components/color-input/color-input.component';
import { ThumbnailComponent } from './shared/components/color-input/thumbnail/thumbnail.component';
import { InputBadgeButtonComponent } from './shared/components/input-badge/input-badge-button/input-badge-button.component';
import { InputBadgeContentComponent } from './shared/components/input-badge/input-badge-content/input-badge-content.component';

import { ColorContrastDirective } from './shared/directive/color-contrast.directive';
import { PopupDirective } from './shared/directive/popup.directive';


@NgModule({
  declarations: [
    AppComponent,
    ColorContrastDirective,
    PopupDirective,
    PopupButtonComponent,
    PopupContentComponent,
    ColorInputComponent,
    ThumbnailComponent,
    InputBadgeButtonComponent,
    InputBadgeContentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    ClipboardModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
