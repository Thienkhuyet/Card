import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url = 'http://localhost/Card/www/login.php';
  isLogin: boolean;
  subject=new BehaviorSubject({});
  constructor(private http: HttpClient) { }
  login(body) {
    return this.http.post<any>(this.url, body);
  }

  logout() {
    localStorage.setItem('tocken', null);
    this.isLogin = false;
  }
  saveTocken(tocken: string) {
    localStorage.setItem('tocken', tocken);
  }
  getSubject(){
    return this.subject;
  }
  kiemtraLogin(): boolean {
    if (localStorage.getItem('tocken') !== null) {
      this.subject.next({});
      return true;
    } else {
      return false;
    }
  }
}
