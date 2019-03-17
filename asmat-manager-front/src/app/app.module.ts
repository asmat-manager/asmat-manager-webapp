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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AsmatFilterPipe } from './home/list-asmats/asmat-filter.pipe';
import { AsmatFormComponent } from './home/asmat-form/asmat-form.component';
import { AddAsmatComponent } from './home/add-asmat/add-asmat.component';
import { UpdateAsmatComponent } from './home/update-asmat/update-asmat.component';

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    HomeComponent,
    NavbarComponent,
    ListAsmatsComponent,
    AsmatsTableComponent,
    AsmatFilterPipe,
    AsmatFormComponent,
    AddAsmatComponent,
    UpdateAsmatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ElectronService,
    AsmatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
