import { NgForm } from '@angular/forms';
import { Item, Order } from './../shared/order.model';
import { MatPaginator } from '@angular/material/paginator';
import { OrdersService } from 'src/app/shared/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-reward-check',
  templateUrl: './reward-check.component.html',
  styleUrls: ['./reward-check.component.css'],
})
export class RewardCheckComponent implements OnInit {
  orders: Order[];
  period: string;
  items: Item[];
  orderSub: Subscription;

  textSearch: string;

  displayedColumns: string[] = [

    'customer',
    'actions',
  ];
  dataSource = new MatTableDataSource();
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sort') sort: MatSort;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {}

  // onCheckReward(form: NgForm) {
  //   let value = form.value
  //   this.ordersService.getRewards(value.period).subscribe((res: any) => {
  //     this.dataSource = new MatTableDataSource(res)
  //     this.dataSource.paginator = this.paginator
  //     this.dataSource.sort = this.sort
  //   })
  // }

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
      this.dataSource.data = res.lists
    })
  }
}
