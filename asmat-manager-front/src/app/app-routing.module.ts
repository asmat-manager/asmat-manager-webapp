import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ListAsmatsComponent} from './home/list-asmats/list-asmats.component';
import {AddAsmatComponent} from './home/add-asmat/add-asmat.component';
import {UpdateAsmatComponent} from './home/update-asmat/update-asmat.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './service/guard/auth.guard';

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
        path: '',
        component: ListAsmatsComponent
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
        redirectTo: ''
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
