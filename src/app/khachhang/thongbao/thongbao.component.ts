import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { EditKhachhangComponent } from '../edit-khachhang/edit-khachhang.component';

@Component({
  selector: 'app-thongbao',
  templateUrl: './thongbao.component.html',
  styleUrls: ['./thongbao.component.scss']
})
export class ThongbaoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditKhachhangComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
