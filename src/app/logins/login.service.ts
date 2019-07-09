import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private readonly url = 'http://localhost/www/login.php';
  constructor(private http: HttpClient) { }
  login(body) {
    return this.http.post<any>(this.url, body);
  }
  saveTocken(tocken: string): void {
    localStorage.setItem('tocken', tocken);
  }
}
