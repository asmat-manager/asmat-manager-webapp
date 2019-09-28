import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindAsmatsRoutingModule } from './remind-asmats-routing.module';
import { RemindAsmatsComponent } from './remind-asmats.component';


@NgModule({
  declarations: [RemindAsmatsComponent],
  imports: [
    CommonModule,
    RemindAsmatsRoutingModule
  ]
})
export class RemindAsmatsModule { }
