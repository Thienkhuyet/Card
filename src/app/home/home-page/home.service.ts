import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly url = 'http://localhost/Card/www/Home.php';
  constructor(private http: HttpClient) { }
  getRepoIssues(sort: string, order: string, page: number,pageSize,search) {
    console.log(search);
     if(sort==='created')sort='Hoten';
    const requestUrl =
        `${this.url}?&sort=${sort}&order=${order}&page=${page + 1}&size=${pageSize}&search=${search}`;

    return this.http.get<any>(requestUrl);
  }

}
