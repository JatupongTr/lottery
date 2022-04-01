import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';

// New Agents
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Agent } from '../agents/agent.model';
import { AgentsService } from '../agents/agents.service';

// get orders
import { OrdersService } from '../shared/orders.service';
import { Order } from '../shared/order.model';

@Component({
    selector: 'app-overviews',
    templateUrl: './overviews.component.html',
    styleUrls: ['./overviews.component.css']
})
export class OverviewsComponent implements OnInit {

    //income layout  
  
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
        backgroundColor: '#fafafa',
        borderColor: '#2196F3',
        pointBackgroundColor: '#2196F3',
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

    //activity layout  

    public barChartOptions: ChartOptions = {
      responsive: true,
      // We use these empty structures as placeholders for dynamic theming.
      scales: {
        xAxes: [],
        yAxes: []
      },
      plugins: {
        legend: {
          display: true,
        },
        datalabels: {
          anchor: 'end',
          align: 'end'
        }
      }
    };

    public barChartColors: Color[] = [
      {
        backgroundColor: '#2196F3'
      },
    ];

    public barChartType: ChartType = 'bar';
    
    public barChartLabels: Label[] = [ '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  
    public barChartData: ChartDataSets[] = [{
      data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A'  
    }];


    //popular numbers layout 

    public barHChartOptions: ChartOptions = {
      responsive: true
    };
    
    public barHChartColors: Color[] = [
      {
        backgroundColor: '#2196F3'
      },
    ];

    public barHChartType: ChartType = 'horizontalBar';
    public barHChartLegend = true;
  
    public barHChartData: ChartDataSets[] = [
      { data: [1, 2, 3], label: 'Open', stack: 'b' },
      { data: [1, 2, 3], label: 'Approved', stack: 'a' }
    ];
    public barHChartLabels: string[] = ['P', 'R', 'B'];



  // get orders
  orders: Order[];
  private ordersSub: Subscription;

  dataOrders = new MatTableDataSource<Order>();

  // New Agents
  agents: Agent[];
  private agentSub: Subscription;
  textSearch: string;

  displayedColumns = ['image', 'code', 'name', 'more'];
  dataSource = new MatTableDataSource<Agent>();

  constructor(
    private agentsService: AgentsService,
    private ordersService: OrdersService
  ) {}

  ngOnInit() {
    this.settChartAspectRatio()
    // New Agents
    this.agentsService.getAgents();
    this.agentSub = this.agentsService.getAgentUpdatedListner()
      .subscribe((agents: Agent[]) => {
        this.dataSource.data = agents;
      })

    // get oders
    this.ordersService.getOrders();
    this.ordersSub = this.ordersService.getOrderUpdatedListner()
      .subscribe((orders: Order[]) => {
        this.dataOrders.data = orders;
      })
  }
  
}