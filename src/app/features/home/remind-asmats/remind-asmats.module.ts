import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RemindAsmatsRoutingModule } from './remind-asmats-routing.module';
import { RemindAsmatsComponent } from './remind-asmats.component';
import { RemindAsmatsTableComponent } from './remind-asmats-table/remind-asmats-table.component';
import { MaterialModule } from '../../../material/material.module';
import { RejoinConfirmModalComponent } from './rejoin-confirm-modal/rejoin-confirm-modal.component';


@NgModule({
  declarations: [
    RemindAsmatsComponent,
    RemindAsmatsTableComponent,
    RejoinConfirmModalComponent
  ],
  imports: [
    CommonModule,
    RemindAsmatsRoutingModule,
    MaterialModule,
  ],
  entryComponents: [RejoinConfirmModalComponent]
})
export class RemindAsmatsModule {
}
