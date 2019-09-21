import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewHomeRoutingModule } from './new-home-routing.module';
import { HomeComponent } from './home.component';
import { AsmatFormComponent } from '../home/asmat-form/asmat-form.component';
import { AddAsmatComponent } from '../home/add-asmat/add-asmat.component';
import { UpdateAsmatComponent } from '../home/update-asmat/update-asmat.component';
import { ListAsmatsComponent } from '../home/list-asmats/list-asmats.component';
import { AsmatsTableComponent } from '../home/list-asmats/asmats-table/asmats-table.component';
import { AsmatDetailsComponent } from '../home/asmat-details/asmat-details.component';
import { PrintTableComponent } from '../home/print-table/print-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    HomeComponent,
    AsmatFormComponent,
    AddAsmatComponent,
    UpdateAsmatComponent,
    ListAsmatsComponent,
    AsmatsTableComponent,
    AsmatDetailsComponent,
    PrintTableComponent
  ],
  imports: [
    CommonModule,
    NewHomeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class NewHomeModule {
}
