import 'reflect-metadata';
import '../polyfills';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material.module';
import {AsmatService} from './service/asmat.service';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './service/auth.service';
import {TokenInterceptor} from './service/interceptor/token.interceptor';
import {UnauthorizedInterceptor} from './service/interceptor/unauthorized.interceptor';
import {AuthGuard} from './service/guard/auth.guard';
import {ToastService} from './service/toast.service';
import {NoConnectionInterceptor} from './service/interceptor/no-connection.interceptor';
import {ServerErrorModalComponent} from './server-error-modal/server-error-modal.component';
import {ServerErrorInterceptor} from './service/interceptor/server-error.interceptor';
import {SortPipe} from './pipe/sort.pipe';
import {AsmatFilterPipe} from './features/home/list-asmats/asmat-filter.pipe';
import {DeleteConfirmModalComponent} from './features/home/delete-confirm-modal/delete-confirm-modal.component';
import {PrintModalComponent} from './features/home/list-asmats/print-modal/print-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AsmatFilterPipe,
    DeleteConfirmModalComponent,
    ServerErrorModalComponent,
    PrintModalComponent,
    SortPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [
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
