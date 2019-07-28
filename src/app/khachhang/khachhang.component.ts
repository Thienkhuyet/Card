import { DanhsachKhachhangComponent } from './danhsach-khachhang/danhsach-khachhang.component';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.scss']
})
export class KhachhangComponent implements OnInit {
 
  tapIndex = 0;
 
  dataKhachhang={};
@ViewChild(DanhsachKhachhangComponent,{static:false})danhsach:DanhsachKhachhangComponent;
  constructor() { }

  ngOnInit() {
 
  }
 
  getkhachhang(data) {
    this.dataKhachhang = data;
    this.tapIndex = 1;
  }
  setTap(index) {
  //   this.khService.getRepoIssues().subscribe(res=>{
  //     this.data=res;
  //   });
    this.tapIndex = index;
    if(index===0)
    this.danhsach.onBlur("");
  }
  getchang(a){
  //  this.pageSize = a.pageSize;
  }
}
