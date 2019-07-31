import { LoginService } from './login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private login: Subscription;

  constructor(private router: Router, private loginService: LoginService) { }

  title = 'Minh vuong';
  taikhoan: string = '';
  isChao: boolean = false;
  logout() {
    this.isChao = false;
    localStorage.removeItem('tocken');
    this.router.navigate(['login']);
  }
  ngOnInit(): void {
    this.login = this.loginService.getSubject().subscribe(res => {
      this.checkLogin();
    });
    this.checkLogin();

  }
  public checkLogin() {
    if (localStorage.getItem('tocken')) {
      this.taikhoan = JSON.parse(localStorage.getItem('tocken'))['Username'];
      this.isChao = true;
    } else {
      this.isChao = false;
    }
  }
}
