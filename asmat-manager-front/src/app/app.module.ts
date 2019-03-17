import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ElectronService} from './electron/electron.service';
import {WebviewDirective} from './electron/webview.directive';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import {MaterialModule} from './material/material.module';
import { ListAsmatsComponent } from './home/list-asmats/list-asmats.component';
import { AsmatsTableComponent } from './home/list-asmats/asmats-table/asmats-table.component';
import {AsmatService} from './service/asmat.service';
import {FormsModule} from '@angular/forms';
import { AsmatFilterPipe } from './home/list-asmats/asmat-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    HomeComponent,
    NavbarComponent,
    ListAsmatsComponent,
    AsmatsTableComponent,
    AsmatFilterPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule
  ],
  providers: [
    ElectronService,
    AsmatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
