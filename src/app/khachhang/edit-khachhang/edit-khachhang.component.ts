import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { KhachhangService } from '../khachhang.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'util';

@Component({
  selector: 'app-edit-khachhang',
  templateUrl: './edit-khachhang.component.html',
  styleUrls: ['./edit-khachhang.component.scss']
})
export class EditKhachhangComponent implements OnInit {
  minDate = new Date(1900, 0, 1);
  maxDate = new Date();
  formKhachhang: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private khservice: KhachhangService,
    private activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.formKhachhang = this.fb.group({
      Tendangnhap: ['', [Validators.required, Validators.maxLength(30)]],
      Matkhau: ['', [Validators.required, Validators.maxLength(30)]],
      lapmatkhau: [''],
      Hoten: ['', [Validators.required, Validators.maxLength(150)]],
      Email: ['', [Validators.required, Validators.email]],
      Ngaysinh: ['', [Validators.required]],
      Thanhpho: [''],
      Quan: [''],
      Thitran: [''],
      Mota: ['']
    }, {
        validator: MustMatch('Matkhau', 'lapmatkhau')
      });
    // console.log(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  // openDialog(): void {
  //   const dialogRef = this.dialog.open(EditKhachhangComponent, {
  //     width: '250px',
  //     data: { name: 'Tom', animal: 'Dog' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed', result);
  //   });
  // }
  onSubmit() {
    const { valid, value } = this.formKhachhang;
    if (valid) {
      this.khservice.themKhachhang(value).subscribe(res => {
        this.formKhachhang.reset();
        this._snackBar.open("Thêm thành công", "Good!!", {
          duration: 2000,
          verticalPosition: 'top'
        })
      }

        ,
        error => {
          this._snackBar.open("Có lỗi", "NOO!!", {
            duration: 2000,
            verticalPosition: 'top'
          })
        });

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