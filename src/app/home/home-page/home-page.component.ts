import { Component, OnInit, ViewChild , AfterViewInit} from '@angular/core';
import { HomeService } from './home.service';
import { MatPaginator, MatSort,  } from '@angular/material';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators'
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit,AfterViewInit {
  displayedColumns: string[] = ['STT', 'Hoten', 'Email', "Ngaysinh",'SDT', "Ten", 'Matkhau', 'Chucnang'];
  resultsLength = 0;
  data=[];
  search:string='';
  pageSize:number=1;
  isSearch=true;
  isLoadingResults = true;
  isRateLimitReached = false;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  constructor(private homeService: HomeService) { }

  ngOnInit() {
   
  
  }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.homeService!.getRepoIssues(
            this.sort.active, this.sort.direction, this.paginator.pageIndex,this.pageSize,this.search);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_column;

          return data.data;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      ).subscribe(data => {
     //   console.log(data);
        this.data = data;
      });
  }
  getchang(a){
    this.pageSize = a.pageSize;
  }
  onBlur(value:string){
    console.log(value)
  //  this.data.filter = value.trim();
    this.search=value;
    this.homeService.getRepoIssues(  this.sort.active, this.sort.direction, this.paginator.pageIndex,this.pageSize,this.search).pipe(
      map(data=> {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.total_column;

        return data.data;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe(data=>this.data=data)
  }
}
  

