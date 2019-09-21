import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListAsmatsComponent } from '../home/list-asmats/list-asmats.component';
import { AsmatDetailsComponent } from '../home/asmat-details/asmat-details.component';
import { AddAsmatComponent } from '../home/add-asmat/add-asmat.component';
import { UpdateAsmatComponent } from '../home/update-asmat/update-asmat.component';
import { PrintTableComponent } from '../home/print-table/print-table.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'asmats',
        component: ListAsmatsComponent
      },
      {
        path: 'asmats/:id',
        component: AsmatDetailsComponent
      },
      {
        path: 'add',
        component: AddAsmatComponent
      },
      {
        path: 'update/:id',
        component: UpdateAsmatComponent
      },
      {
        path: 'print',
        component: PrintTableComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewHomeRoutingModule {
}
