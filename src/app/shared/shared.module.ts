import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material';
import { WINDOW_PROVIDERS } from './window.service';
import { WpContentComponent } from './wp-content/wp-content.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    WpContentComponent
  ],
  declarations: [WpContentComponent],
  providers: [
    WINDOW_PROVIDERS
  ]
})
export class SharedModule {

}
