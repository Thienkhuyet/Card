import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url = 'http://localhost/www/login.php';
  isLogin: boolean;
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
  kiemtraLogin(): boolean {
    if (localStorage.getItem('tocken') !== null) {
      return true;
    } else {
      return false;
    }
  }
}
