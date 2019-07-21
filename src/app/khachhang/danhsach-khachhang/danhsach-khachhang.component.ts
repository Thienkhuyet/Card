import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { KhachhangService } from '../khachhang.service';
import { Router } from '@angular/router';
// import { catchError, map, startWith, switchMap } from 'rxjs/operators';
// import { merge, Observable, of as observableOf } from 'rxjs';

@Component({
  selector: 'app-danhsach-khachhang',
  templateUrl: './danhsach-khachhang.component.html',
  styleUrls: ['./danhsach-khachhang.component.scss']
})
export class DanhsachKhachhangComponent implements OnInit {

  displayedColumns: string[] = ['STT', 'Hoten', 'Email', "Ngaysinh",'SDT', "Ten", 'Matkhau', 'Chucnang'];
  @Output('eventKhachhang') change = new EventEmitter<any>(); 
  datakhachhang:[];
  constructor( 
    ) { }
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @Input()
  set dataKhachhang1(value){
    if(value){
    this.dataSource.sort = this.sort;
  
    this.dataSource.data =value;
  
  this.dataSource.paginator = this.paginator;
    }
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  
    this.dataSource.data =[];
  
  this.dataSource.paginator = this.paginator;
  
  }
  suaKhachhang(action:string,data){
    let x={'ac':action,'data':data}
   this.change.emit(x);
  
  // this.khService.setSuaKhachhang(data);
 // let id=data['KH_id'];
   //this.router.navigate(['khachhang','edit',id]);
  }
}


