import { Component, OnInit ,OnDestroy, Input, AfterViewInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { KhachhangService } from '../khachhang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';


@Component({
  selector: 'app-edit-khachhang',
  templateUrl: './edit-khachhang.component.html',
  styleUrls: ['./edit-khachhang.component.scss'],
  providers: [
    {
        provide: DateAdapter, useClass: AppDateAdapter
    },
    {
        provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS
    }
    ]
})
export class EditKhachhangComponent implements OnInit,AfterViewInit{
 
 
  notEdit=true;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  formKhachhang: FormGroup;
 // private subjectkh: Subscription;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private khservice: KhachhangService,
    private dateAdapter: DateAdapter<Date>,
    private _snackBar: MatSnackBar
  ) { }
@Input()
set khachhang(value){
  if(value){
    if(value.ac === 'edit'){
      this.notEdit=false;
      this.formKhachhang.get('lapmatkhau').disable();
      this.formKhachhang.get('Tendangnhap').setValue(value.data['Ten']);  
      this.formKhachhang.patchValue(value.data);
    }
    else{
      if(value.ac === 'add'){
        this.formKhachhang.reset();
        this.notEdit=true;
      }
     
      
    }
  }
}
  ngAfterViewInit(): void {
    
   
  }
  ngOnInit() {
    this.dateAdapter.setLocale('vi');
    this.formKhachhang = this.fb.group({
      Tendangnhap: ['', [Validators.required, Validators.maxLength(30)]],
      Matkhau: ['', [Validators.required, Validators.maxLength(30)]],
      lapmatkhau: [''],
      Hoten: ['', [Validators.required, Validators.maxLength(150)]],
      Email: ['', [Validators.required, Validators.email]],
      SDT: ['', [Validators.required]],
      Ngaysinh: ['', [Validators.required]],
      Hoatdong:[false],
      TK_id:[],
      DC_id:[],
      KH_id:[],
      Tinh: [''],
      Huyen: [''],
      Xa: [''],
      Mota: ['']
    }, {
        validator: MustMatch('Matkhau', 'lapmatkhau')
      });
      
   
      
  }
  
  onSubmit() {
    const { valid, value } = this.formKhachhang;
    if(this.notEdit){
      if (valid) {
        this.khservice.themKhachhang(value).subscribe(() => {
          this._snackBar.open("Thêm thành công", "Good!!", {
            duration: 2000,
            verticalPosition: 'top'
          })
        }
  
          ,
          error => {
            console.log(error);
            this._snackBar.open("Có lỗi", "NOO!!", {
              duration: 2000,
              verticalPosition: 'top'
            })
          });
  
      }
    }else{
      if (valid) {
        console.log(">>>>>>>>>>>>>>>>>",value);
        this.khservice.suaKhachhang(value).subscribe(() => {
          this._snackBar.open("Sửa thành công", "Good!!", {
            duration: 2000,
            verticalPosition: 'top'
          })
        }
  
          ,
          error => {
            console.log(error);
            this._snackBar.open("Có lỗi", "NOO!!", {
              duration: 2000,
              verticalPosition: 'top'
            })
          });
  
      }
      
    }
    
  }
}
export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.get(controlName);
    const matchingControl = formGroup.get(matchingControlName);

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}