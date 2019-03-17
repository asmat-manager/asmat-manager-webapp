import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {WebviewDirective} from './directives/webview.directive';

@NgModule({
  declarations: [
    WebviewDirective,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    WebviewDirective
  ]
})
export class SharedModule {
}
