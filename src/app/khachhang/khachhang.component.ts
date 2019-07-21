import { Component, OnInit } from '@angular/core';
import { KhachhangService } from './khachhang.service';

@Component({
  selector: 'app-khachhang',
  templateUrl: './khachhang.component.html',
  styleUrls: ['./khachhang.component.scss']
})
export class KhachhangComponent implements OnInit {
  tapIndex = 0;
  dataKhachhang={};
   data:[];
  constructor(private khService: KhachhangService) { }

  ngOnInit() {
    this.khService.getRepoIssues().subscribe(res=>{
      this.data=res;
    })
  }
  

  getkhachhang(data) {
    this.dataKhachhang = data;
    this.tapIndex = 1;
  }
  setTap(index) {
   if(index===0) this.khService.getRepoIssues().subscribe(res=>{
      this.data=res;
    });
    this.tapIndex = index;
  }
}
