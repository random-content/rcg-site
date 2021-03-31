import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { WINDOW_PROVIDERS } from './window.service';
import { ContentComponent } from './content/content.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CommonModule,
    BrowserAnimationsModule,
    MatIconModule,
    HttpClientModule,
    ContentComponent
  ],
  declarations: [ContentComponent],
  providers: [
    WINDOW_PROVIDERS
  ]
})
export class SharedModule {

}
