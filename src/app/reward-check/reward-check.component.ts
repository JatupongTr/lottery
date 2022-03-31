import { MatPaginator } from '@angular/material/paginator';
import { OrdersService } from 'src/app/shared/orders.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Item, Order } from '../shared/order.model';

@Component({
  selector: 'app-reward-check',
  templateUrl: './reward-check.component.html',
  styleUrls: ['./reward-check.component.css'],
})
export class RewardCheckComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true }) paginator: MatPaginator;

  orders: Order[];
  period: string;
  items: Item[]
  orderSub: Subscription;

  textSearch: string;

  displayedColumns: string[] = [
    'agentId',
    'lottoNo',
    'categoryId',
    'price',
    'discount',
    'netPrice',
  ]
  dataSource = new MatTableDataSource<Order>();

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {

  }
}
