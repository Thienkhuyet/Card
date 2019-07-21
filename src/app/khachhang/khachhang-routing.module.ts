import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditKhachhangComponent } from './edit-khachhang/edit-khachhang.component';
import { OauthGuard } from '../oauth.guard';
import { DanhsachKhachhangComponent } from './danhsach-khachhang/danhsach-khachhang.component';
import { KhachhangComponent } from './khachhang.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: KhachhangComponent,
    //  canActivate: [OauthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KhachhangRoutingModule { }
