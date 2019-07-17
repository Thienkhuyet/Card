import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private readonly url = 'http://localhost/www/khachhang.php?action=';
  constructor(private http: HttpClient) { }
  themKhachhang(data: any) {
    let headers = {
      'Authorization': localStorage.getItem('tocken'),
    }
    return this.http.post(this.url + 'add', data, { headers });
  }
  suaKhachhang(data: any) {
    return this.http.post(this.url + 'edit', data);
  }
  getRepoIssues(): Observable<any> {
    let headers = {
      'Authorization': localStorage.getItem('tocken'),
    }
    const href = 'http://localhost/www/khachhang.php?action=list';
    return this.http.get<any>(href, { headers });
  }
}
