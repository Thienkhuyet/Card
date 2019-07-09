import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private readonly url = 'http://localhost/www/Home.php';
  constructor(private http: HttpClient) { }
  getHomePage() {
    let headers = {
      'Authorization': localStorage.getItem('tocken'),
    }
    return this.http.get<any>(this.url, { headers });
  }

}
