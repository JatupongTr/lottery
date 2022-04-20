import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { OrdersService } from 'src/app/shared/orders.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Order } from '../shared/order.model';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common'
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../check-orders/check-orders.component';

@Component({
  selector: 'app-orders-detail',
  templateUrl: './orders-detail.component.html',
  styleUrls: ['./orders-detail.component.css'],
})
export class OrdersDetailComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true }) paginator: MatPaginator

  orders: Order;
  orderId: string;
  agent: string;
  customer: string;
  period: string;

  displayedColumns: string[] = [
    'lottoNo',
    'categoryId',
    'price',
    'discount',
    'netPrice',
  ];
  dataSource = new MatTableDataSource<Order>();

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator
    this.ordersService.getItemsOrder(this.data.orderId).subscribe((res: any) =>{
      this.dataSource.data = res.order.items
      this.agent = res.order.agentId.code
      this.customer = res.order.customer
      this.period = res.order.period

    })
  }
}
