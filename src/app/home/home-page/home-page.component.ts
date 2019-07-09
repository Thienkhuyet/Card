import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  data: any;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
  
  }

  onLoad(): void {
    this.homeService.getHomePage().subscribe(res => {
      this.data = res;
    })
  }
}
