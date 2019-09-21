import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewHomeRoutingModule } from './new-home-routing.module';
import { HomeComponent } from './home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    NewHomeRoutingModule
  ]
})
export class NewHomeModule {
}
