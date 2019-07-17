import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OauthGuard } from './oauth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./logins/logins.module').then(m => m.LoginsModule)

  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    canActivate: [OauthGuard]
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
  },
  {
    path: 'khachhang',
    loadChildren: () => import('./khachhang/khachhang.module').then(m => m.KhachhangModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
