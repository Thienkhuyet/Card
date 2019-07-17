import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { KhachhangService } from '../khachhang.service';
// import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { merge, Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-danhsach-khachhang',
  templateUrl: './danhsach-khachhang.component.html',
  styleUrls: ['./danhsach-khachhang.component.scss']
})
export class DanhsachKhachhangComponent implements OnInit {

  displayedColumns: string[] = ['STT', 'Hoten', 'emial', "ngaysinh", "Ten", 'Matkhau', 'Chucnang'];
  constructor(private khService: KhachhangService) {

  }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.khService.getRepoIssues().subscribe(data => {
      this.dataSource.data = data;
      console.table(data);
    })
    this.dataSource.paginator = this.paginator;
  }
}


