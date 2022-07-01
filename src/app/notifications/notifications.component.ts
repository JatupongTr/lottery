
import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../shared/orders.service';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { SettingsService } from '../settings/settings.service';
import { NotificationsService } from '../shared/notifications.service';

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

  notiData = []
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
    private service: SettingsService,
    private notiService: NotificationsService
  ) {}


  ngOnInit() {
    this.notiService.getCreateAgentNoti().subscribe((res: any) => {
      this.notiData = res
    })

    this.notiService.readNotification().subscribe((res: any) => {
      console.log(res)
    })
  }

  onClear() {
    if (confirm('ล้างแจ้งเตือน')){
      this.notiService.clearNotification().subscribe((res: any) => {
        window.location.reload()
      })
    }

  }

}

