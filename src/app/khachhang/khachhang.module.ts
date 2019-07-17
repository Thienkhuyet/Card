import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KhachhangRoutingModule } from './khachhang-routing.module';
import { EditKhachhangComponent } from './edit-khachhang/edit-khachhang.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ThongbaoComponent } from './thongbao/thongbao.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DanhsachKhachhangComponent } from './danhsach-khachhang/danhsach-khachhang.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatkhauPipe } from './matkhau.pipe';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [EditKhachhangComponent, ThongbaoComponent, DanhsachKhachhangComponent, MatkhauPipe],
  imports: [
    CommonModule,
    KhachhangRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule


  ],
  entryComponents: [ThongbaoComponent, EditKhachhangComponent],
})
export class KhachhangModule { }