import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ListAsmatsComponent } from './list-asmats/list-asmats.component';
import { AsmatDetailsComponent } from './asmat-details/asmat-details.component';
import { AddAsmatComponent } from './add-asmat/add-asmat.component';
import { UpdateAsmatComponent } from './update-asmat/update-asmat.component';
import { PrintTableComponent } from './print-table/print-table.component';


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
        path: 'remind',
        loadChildren: () => import('./remind-asmats/remind-asmats.module')
          .then(({RemindAsmatsModule}) => RemindAsmatsModule)
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
export class HomeRoutingModule {
}
