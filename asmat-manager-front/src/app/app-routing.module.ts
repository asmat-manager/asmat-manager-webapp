import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListAsmatsComponent} from './home/list-asmats/list-asmats.component';
import {AddAsmatComponent} from './home/add-asmat/add-asmat.component';
import {UpdateAsmatComponent} from './home/update-asmat/update-asmat.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './service/guard/auth.guard';
import {AsmatDetailsComponent} from './home/asmat-details/asmat-details.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
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
        path: '**',
        redirectTo: 'asmats'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
