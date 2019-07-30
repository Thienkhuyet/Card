import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ChartType, ChartOptions,  } from 'chart.js';
import { Label, SingleDataSet } from 'ng2-charts';
import { KhachhangService } from '../khachhang.service';

@Component({
  selector: 'app-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.scss']
})
export class ThongkeComponent implements OnInit, AfterViewInit {

  public polarAreaChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: SingleDataSet = [300, 500, 100, 40, 120];
  public polarAreaLegend = true;
  public barChartOptions: ChartOptions ={
    title:{
      display:true,
      position: 'bottom',
      text:'Biểu đồ thống kê sản phẩm trong giỏ'
    },
    legend:{
      position:'bottom'
    }
    ,
    responsive: true
  }
  public polarAreaChartType: ChartType = 'pie';

  constructor(private khService:KhachhangService) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
   this.polarAreaChartLabels.length = 0;
   this.polarAreaChartData.length = 0;
   this.khService.getThongke().subscribe(res=>{
     res.map(item=>{
       this.polarAreaChartLabels.push(item.Ten_SP);
       this.polarAreaChartData.push(item.Gia);
     })
   })
   
  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
