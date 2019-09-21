import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './service/guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./new-home/new-home.module').then(({NewHomeModule}) => NewHomeModule)
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
export class AppRoutingModule {
}
