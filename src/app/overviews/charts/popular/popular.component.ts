import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Chart, ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { OrdersService } from 'src/app/shared/orders.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularComponent implements OnInit {
  constructor(private ordersService: OrdersService) {}
  popularData = [];
  labelData = [];
  displayedColumns = ['No', 'lottoNo', 'count', 'action'];
  dataSource = new MatTableDataSource();

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [];
  public barChartLabels: string[] = [];

  ngOnInit(): void {
    this.ordersService.getPopularNumber().subscribe((res: any) => {
      let data = [];
      let count = [];
      if (res) {
        for (let i = 0; i < 3; i++) {
          if (res[i]) {
            count.push(res[i].count);
            data.push(res[i]._id);
          }
        }
        this.popularData = count;
        this.barChartLabels = data;
        this.barChartData = [
          { data: this.popularData, label: 'จำนวน', stack: 'a' },
        ];
      }
    });
  }


}
