import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { delay, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private readonly url = 'http://localhost/Card/www/khachhang.php?action=';
  // private subject = new BehaviorSubject(0);
  constructor(private http: HttpClient) { }
  themKhachhang(data: any) {
    let headers = {
      'Authorization': JSON.parse(localStorage.getItem('tocken'))['jwt'],
    }
    return this.http.post(this.url + 'add', data, { headers });
  }
  //chuc nang sua khach hang
  suaKhachhang(data: any) {
    let headers = {
      'Authorization': JSON.parse(localStorage.getItem('tocken'))['jwt']
    }
    return this.http.post(this.url + `edit`, data, { headers });
  }


  getKhachhangs(sort: string, order: string, page: number, pageSize, search) {
    if (sort === 'created') sort = 'Hoten';
    let headers = {
      'Authorization': JSON.parse(localStorage.getItem('tocken'))['jwt']
    }
    const requestUrl =
      `${this.url}list&sort=${sort}&order=${order}&page=${page + 1}&size=${pageSize}&search=${search}`;

    return this.http.get<any>(requestUrl, { headers });
  }

  checkUsername(name: string) {
    const value = { username: name };
    return this.http.post(this.url + 'checkDuplicate', value);
  }
  getThongke() {
    return this.http.get<any>('http://localhost/Card/www/register.php?khang=11');
  }
}
