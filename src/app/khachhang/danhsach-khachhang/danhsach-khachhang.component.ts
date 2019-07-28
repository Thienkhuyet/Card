import { MatSort, MatPaginator } from '@angular/material';
import { Component, OnInit, ViewChild, EventEmitter, Output, Input ,AfterViewInit} from '@angular/core';
import {merge, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap} from 'rxjs/operators';
import { KhachhangService } from '../khachhang.service';

@Component({
  selector: 'app-danhsach-khachhang',
  templateUrl: './danhsach-khachhang.component.html',
  styleUrls: ['./danhsach-khachhang.component.scss']
})
export class DanhsachKhachhangComponent implements OnInit, AfterViewInit{
  data:[];
  resultsLength = 0;
  search:string='';
  pageSize:number=5;
  isSearch=true;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayedColumns: string[] = ['STT', 'Hoten', 'Email', "Ngaysinh",'SDT', "Ten", 'Matkhau', 'Chucnang'];
  @Output('eventKhachhang') change = new EventEmitter<any>(); 
 
    
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  datakhachhang:[];
  constructor( 
    private khService: KhachhangService
    ) { }


  ngOnInit() {
 //   this.dataSource.sort = this.sort;
  
  
 // this.dataSource.paginator = this.paginator;
  
  }
  ngAfterViewInit(): void {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
 
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.khService!.getKhachhangs(
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
        console.log(data);
        this.data = data;
      });
   }
   onBlur(value:string){
    console.log(value)
  //  this.data.filter = value.trim();
   this.InitTable(value);
  }
  suaKhachhang(action:string,data){
    let x={'ac':action,'data':data}
   this.change.emit(x);
  
  // this.khService.setSuaKhachhang(data);
 // let id=data['KH_id'];
   //this.router.navigate(['khachhang','edit',id]);
  }
  getchang(a){
    this.pageSize = a.pageSize;
  }
  private InitTable(value){
    this.search=value;
    this.khService.getKhachhangs(  this.sort.active, this.sort.direction, this.paginator.pageIndex,this.pageSize,this.search).pipe(
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


