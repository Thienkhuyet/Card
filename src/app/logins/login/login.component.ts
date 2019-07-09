import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginFrom: FormGroup;
  constructor(private fb: FormBuilder, private loginService: LoginService) { }
  tocken: any;
  ngOnInit() {
    this.loginFrom = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit() {
    const { value, valid } = this.loginFrom;
    console.log(value);
    if (valid) {
      this.loginService.login(value).subscribe(res => {
        this.loginService.saveTocken(res.jwt);
      })
    } else {
      console.log("loi login");
    }
  }
}
