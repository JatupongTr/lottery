
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent {
  KeepPrice: string;
  private ordersSub: Subscription;
  dataSource = new MatTableDataSource();
  period = new Date('2022-04-16');

  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  
  constructor(
    private ordersService: OrdersService,
    private service: SettingsService
  ) {}

  
  ngOnInit() {
  }
  
}

