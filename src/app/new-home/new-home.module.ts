import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewHomeRoutingModule } from './new-home-routing.module';
import { HomeComponent } from './home.component';
import { AsmatFormComponent } from './asmat-form/asmat-form.component';
import { AddAsmatComponent } from './add-asmat/add-asmat.component';
import { UpdateAsmatComponent } from './update-asmat/update-asmat.component';
import { ListAsmatsComponent } from './list-asmats/list-asmats.component';
import { AsmatsTableComponent } from './list-asmats/asmats-table/asmats-table.component';
import { AsmatDetailsComponent } from './asmat-details/asmat-details.component';
import { PrintTableComponent } from './print-table/print-table.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    HomeComponent,
    AsmatFormComponent,
    AddAsmatComponent,
    UpdateAsmatComponent,
    ListAsmatsComponent,
    AsmatsTableComponent,
    AsmatDetailsComponent,
    PrintTableComponent,
    NavbarComponent
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
