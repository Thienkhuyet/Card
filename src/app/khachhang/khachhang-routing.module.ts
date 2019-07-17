import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditKhachhangComponent } from './edit-khachhang/edit-khachhang.component';
import { OauthGuard } from '../oauth.guard';
import { DanhsachKhachhangComponent } from './danhsach-khachhang/danhsach-khachhang.component';


const routes: Routes = [
  {
    path: 'add',
    pathMatch: 'full',
    component: EditKhachhangComponent,
    //  canActivate: [OauthGuard],
  },
  {
    path: 'edit/:id',
    component: EditKhachhangComponent,
    canActivate: [OauthGuard],
  },
  {
    path: 'danhsach',
    component: DanhsachKhachhangComponent,
    //  canActivate: [OauthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhachhangRoutingModule { }
