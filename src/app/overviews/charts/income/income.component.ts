import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import { OrdersService } from 'src/app/shared/orders.service';
@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.css'],
})
export class IncomeComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.settChartAspectRatio();
    // get report
    this.ordersService.getReportIncome().subscribe((res: any) => {
      if (res) {

        for (let i = 1; i <= 12; i++) {
          for (let j = 0; j < res.length; j++) {
            if (res[j] && res[j]._id == i) {
              this.incomeData[i - 1] = res[j].totals;
              break;
            } else {
              this.incomeData[i - 1] = 0;
            }
          }
        }
      }
    });
  }
  //income layout

  incomeData = [];
  public lineChartData: ChartDataSets[] = [
    { data: this.incomeData, label: 'ยอดรายได้' },
  ];
  public lineChartLabels: Label[] = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ];

  public lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: 'ยอดเงิน (บาท)',
          },
          ticks: {
            // maxTicksLimit: 4,
            fontStyle: 'normal',
            fontSize: 13,
            beginAtZero: true,
            callback: (value) => {
              return `฿${value.toLocaleString()}`;
            },

            // callback: ( value ) => {
            //   return this.numberPipe.transform(value);
            // },
          },
          gridLines: {
            drawOnChartArea: false,
            // color: '#676A6C',
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontStyle: 'normal',
            fontSize: 13,
            autoSkip: false,
            maxRotation: window.innerWidth < 1100 ? 90 : 0,
            minRotation: window.innerWidth < 1100 ? 90 : 0,
          },
          gridLines: {
            drawOnChartArea: false,
            // color: '#676A6C',
            lineWidth: 1.5,
          },
        },
      ],
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: '#fafafa',
      borderColor: '#2196F3',
      pointBackgroundColor: '#2196F3',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)',
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
    this.settChartAspectRatio();
  }

  /*
   * sets the charts aspect ratio based on the width of the window
   * */
  private settChartAspectRatio() {
    let aspectRatio: number;
    if (window.innerWidth < 1600 && window.innerWidth > 767) {
      aspectRatio = 2;
    }
    if (window.innerWidth < 768) {
      aspectRatio = 1.5;
    }
    if (window.innerWidth > 1600) {
      aspectRatio = 3.5;
    }
  }
}
