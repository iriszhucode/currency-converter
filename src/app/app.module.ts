import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { NglModule } from 'ng-lightning/ng-lightning';

import { ConverterService } from './converter.service';
import { ConverterComponent } from './converter/converter.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NglModule.forRoot()
  ],
  providers: [ConverterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
