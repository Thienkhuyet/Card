import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  private readonly url = 'http://localhost/Card/www/khachhang.php?action=';
  // private subject = new BehaviorSubject(0);
  constructor(private http: HttpClient) { }
  themKhachhang(data: any) {
    let headers = {
      'Authorization': localStorage.getItem('tocken'),
    }
    return this.http.post(this.url + 'add', data, { headers });
  }
  //chuc nang sua khach hang
  suaKhachhang(data: any) {
    let headers = {
      'Authorization': localStorage.getItem('tocken'),
    }
    return this.http.post(this.url + `edit`, data,{headers});
  }
  
  // setSuaKhachhang(data){
  //  this.subject.next(data);
  // }
  // getSuaKhachhang(){
  // return  this.subject;
  //  }

  getRepoIssues(): Observable<any> {
    let headers = {
      'Authorization': localStorage.getItem('tocken'),
    }
    const href = 'http://localhost/Card/www/khachhang.php?action=list';
    return this.http.get<any>(href, { headers });
  }
  
  
}
