import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KhachhangRoutingModule } from './khachhang-routing.module';
import { EditKhachhangComponent } from './edit-khachhang/edit-khachhang.component';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, MatNativeDateModule, MatMenuModule, MatProgressSpinnerModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { KhachhangComponent } from './khachhang.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ThongkeComponent } from './thongke/thongke.component';
import { ChartsModule } from 'ng2-charts';




@NgModule({
  declarations: [EditKhachhangComponent, ThongbaoComponent, DanhsachKhachhangComponent, MatkhauPipe, KhachhangComponent, ThongkeComponent],
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
    MatTooltipModule,
    MatTabsModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    ChartsModule

  ],
  entryComponents: [ThongbaoComponent, EditKhachhangComponent],
})
export class KhachhangModule { }
