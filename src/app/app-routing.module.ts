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
    loadChildren: './logins/logins.module#LoginsModule'

  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    canActivate: [OauthGuard]
  },
  {
    path: 'shared',
    loadChildren: './shared/shared.module#SharedModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
