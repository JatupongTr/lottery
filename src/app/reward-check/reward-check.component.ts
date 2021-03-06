import { RewardCheckDialogComponent } from './../reward-check-dialog/reward-check-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { Item, Order } from './../shared/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { OrdersService } from 'src/app/shared/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

export interface DialogData {
  lists: any;
  totals: any;
}
@Component({
  selector: 'app-reward-check',
  templateUrl: './reward-check.component.html',
  styleUrls: ['./reward-check.component.css'],
})
export class RewardCheckComponent implements OnInit {

  period: string;
  items: Item[];
  orderSub: Subscription;

  textSearch: string;

  displayedColumns: string[] = [
    'agentId',
    'agentName',
    'customer',
    'lists',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  constructor(private ordersService: OrdersService, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  onClick(data: any, totals: any) {
    console.log(totals)
    this.dialog.open(RewardCheckDialogComponent, {
      position: { top: "5%"},
      width:' 80%',
      data: {
        lists: data,
        totals: totals
      }
    })
  }

  onCheckReward(form: NgForm) {
    let value = form.value;
    this.ordersService.checkRewards(
      value.period,
      value.firstPrize,
      value.downTwoPrize,
      value.lastThreePrize1,
      value.lastThreePrize2,
      value.firstThreePrize1,
      value.firstThreePrize2
    ).subscribe((res: any) => {
      this.dataSource.data = res
    })
  }
}
