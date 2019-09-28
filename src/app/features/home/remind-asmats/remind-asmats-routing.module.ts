import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RemindAsmatsComponent } from './remind-asmats.component';


const routes: Routes = [
  {
    path: '',
    component: RemindAsmatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RemindAsmatsRoutingModule {
}
