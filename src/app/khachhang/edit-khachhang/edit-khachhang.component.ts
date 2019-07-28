import { Component, OnInit ,OnDestroy, Input, AfterViewInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, NgForm } from '@angular/forms';
import { KhachhangService } from '../khachhang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { AppDateAdapter, APP_DATE_FORMATS } from './date.adapter';
import { delay, map } from 'rxjs/operators';


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
 
  checked:boolean=false;
  notEdit=true;
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  formKhachhang: FormGroup;
 // private subjectkh: Subscription;
  constructor(
    private fb: FormBuilder,
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
      this.formKhachhang.get('Tendangnhap').disable();
      this.formKhachhang.get('Matkhau').disable();
      this.formKhachhang.get('Tendangnhap').setValue(value.data['Ten']); 
     
      this.formKhachhang.patchValue(value.data);
      this.formKhachhang.get('Hoatdong').setValue(+value.data['Hoatdong']);
    }
    else{
      if(value.ac === 'add'){
        this.formKhachhang.reset();
        this.formKhachhang.get('lapmatkhau').enable();
        this.formKhachhang.get('Tendangnhap').enable();
      this.formKhachhang.get('Matkhau').enable();
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
      Tendangnhap: ['', [Validators.required, Validators.maxLength(30)],this.CheckUsername.bind(this)],
      Matkhau: ['', [Validators.required, Validators.maxLength(30)]],
      lapmatkhau: [''],
      Hoten: ['', [Validators.required, Validators.maxLength(150)]],
      Email: ['', [Validators.required, Validators.email]],
      SDT: ['', [Validators.required,CheckPhone]],
      Ngaysinh: ['', [Validators.required]],
      Hoatdong:[],
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
  
  onSubmit(va:string,form: NgForm) {
    const { valid, value } = this.formKhachhang;
    if(this.notEdit){
      if (valid) {
        value.Ngaysinh=va.toString();
        console.log(value);
        this.khservice.themKhachhang(value).subscribe(() => {
          form.resetForm();
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
        value.Ngaysinh=va.toString();
        value.Hoatdong=+ value.Hoatdong;
        this.khservice.suaKhachhang(value).subscribe(() => {
          form.resetForm();
        //  this.formKhachhang.reset();
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
   CheckUsername(useValue:AbstractControl){
    return this.khservice.chechUsername(useValue.value).pipe(
      delay(2000),
      map(data=>{
        if(data['status']===true)
      return  null;
      else 
      return { userTaken: true };
    }));
  
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
export function CheckPhone(phone:AbstractControl){
  const regex=/[^_0-9]/
  if(regex.test(phone.value)){
 return { invalidPhone:true};
  }else return null;
}
