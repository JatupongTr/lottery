import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-overviews',
    templateUrl: './overviews.component.html',
    styleUrls: ['./overviews.component.css']
})
export class OverviewsComponent implements OnInit {
  
    public lineChartData: ChartDataSets[] = [{ data: [6500, 1039, 200, 8001, 2026, 1900, 508, 980, 1801, 4256, 3255, 7010], label: 'Paused Vehicle' }];
    public lineChartLabels: Label[] = [ 'January 2020', 'February 2020', 'March 2020', 'April 2020', 'June 2020', 'July 2020', 'August 2020', 'September 2020', 'October 2020', 'november 2020', 'December 2020']
  
    public lineChartOptions: ChartOptions  = {
      responsive: true,
          maintainAspectRatio: true,
       scales: {
        yAxes: [
          {
  
           scaleLabel: {
              display:     true,
              labelString: 'Total Price'
              
              },
            ticks: {
              // maxTicksLimit: 4,
              fontStyle: 'normal',
              fontSize: 13,
              beginAtZero: false,
              callback: ( value ) => {
                return `$${value.toLocaleString()}`;
              },
  
              // callback: ( value ) => {
              //   return this.numberPipe.transform(value);
              // },
            },
            gridLines: {
              drawOnChartArea: false,
              // color: '#676A6C',
            }
          }],
        xAxes: [{
          ticks: {
            fontStyle: 'normal',
            fontSize: 13,
            autoSkip: false,
            maxRotation:  window.innerWidth < 1100 ? 90 : 0,
            minRotation: window.innerWidth < 1100 ? 90 : 0,
       
          },
          gridLines: {
            drawOnChartArea: false,
            // color: '#676A6C',
            lineWidth: 1.5
          }
        }]
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
  
    };
    public lineChartColors: Color[] = [
      {
        backgroundColor: 'red',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
      },
    ];
    public lineChartLegend = true;
    public lineChartType: ChartType = 'line';
  
    @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  
        /**
       * Listen for Window Resizing
       */
      @HostListener('window:resize', ['$event'])
      onResize() {
     this.settChartAspectRatio()
    }
  
    constructor() { }
  
    ngOnInit(): void {
      this.settChartAspectRatio()
      
    }
  
      /*
    * sets the charts aspect ratio based on the width of the window
    * */
    private settChartAspectRatio()
     {
       let aspectRatio: number;
      if ( window.innerWidth < 1600 && window.innerWidth > 767 )
      {
        aspectRatio = 2;
      }
      if (window.innerWidth < 768)
      {
        aspectRatio = 1.5;
  
      }
      if (window.innerWidth > 1600)
      {
        aspectRatio = 3.5;
  
      }
    //   this.lineChartOptions.aspectRatio = aspectRatio;
    //   this.chart.chart.aspectRatio = aspectRatio;
    //   this.chart.chart.options.scales.xAxes[0].ticks.maxRotation =  window.innerWidth < 1100 ? 90 : 0;
    //   this.chart.chart.options.scales.xAxes[0].ticks.minRotation =  window.innerWidth < 1100 ? 90 : 0;
    }
  
  
}