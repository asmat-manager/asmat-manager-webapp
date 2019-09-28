import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindAsmatsRoutingModule } from './remind-asmats-routing.module';
import { RemindAsmatsComponent } from './remind-asmats.component';
import { RemindAsmatsTableComponent } from './remind-asmats-table/remind-asmats-table.component';
import { MaterialModule } from '../../../material/material.module';


@NgModule({
  declarations: [
    RemindAsmatsComponent,
    RemindAsmatsTableComponent
  ],
  imports: [
    CommonModule,
    RemindAsmatsRoutingModule,
    MaterialModule
  ]
})
export class RemindAsmatsModule {
}
