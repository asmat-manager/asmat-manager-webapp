import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ElectronService} from './electron/electron.service';
import {WebviewDirective} from './electron/webview.directive';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './home/navbar/navbar.component';
import {MaterialModule} from './material/material.module';
import {ListAsmatsComponent} from './home/list-asmats/list-asmats.component';
import {AsmatsTableComponent} from './home/list-asmats/asmats-table/asmats-table.component';
import {AsmatService} from './service/asmat.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsmatFilterPipe} from './home/list-asmats/asmat-filter.pipe';
import {AsmatFormComponent} from './home/asmat-form/asmat-form.component';
import {AddAsmatComponent} from './home/add-asmat/add-asmat.component';
import {UpdateAsmatComponent} from './home/update-asmat/update-asmat.component';
import {DeleteConfirmModalComponent} from './home/delete-confirm-modal/delete-confirm-modal.component';
import {AuthService} from './service/auth.service';
import {TokenInterceptor} from './service/interceptor/token.interceptor';
import {UnauthorizedInterceptor} from './service/interceptor/unauthorized.interceptor';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './service/guard/auth.guard';
import {ToastService} from './service/toast.service';
import {NoConnectionInterceptor} from './service/interceptor/no-connection.interceptor';
import { ServerErrorModalComponent } from './server-error-modal/server-error-modal.component';
import {ServerErrorInterceptor} from './service/interceptor/server-error.interceptor';
import { AsmatDetailsComponent } from './home/asmat-details/asmat-details.component';
import { PrintModalComponent } from './home/list-asmats/print-modal/print-modal.component';

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
    UpdateAsmatComponent,
    DeleteConfirmModalComponent,
    LoginComponent,
    ServerErrorModalComponent,
    AsmatDetailsComponent,
    PrintModalComponent
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
    AsmatService,
    AuthService,
    ToastService,
    AuthGuard,
    {provide: LOCALE_ID, useValue: 'fr'},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoConnectionInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    DeleteConfirmModalComponent,
    ServerErrorModalComponent,
    PrintModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
