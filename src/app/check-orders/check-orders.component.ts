import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/shared/orders.service';
import { NgForm } from '@angular/forms';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Order } from '../shared/order.model';
import { MatDialog } from '@angular/material/dialog';
import { OrdersDetailComponent } from '../orders-detail/orders-detail.component';

export interface DialogData {
  orderId: "";
}

@Component({
  selector: 'app-check-orders',
  templateUrl: './check-orders.component.html',
  styleUrls: ['./check-orders.component.css'],
})
export class CheckOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  textSearch: string;
  order: Order;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    'code',
    'customer',
    'totalLists',
    'createdAt',
    'actions',
  ];
  constructor(private ordersService: OrdersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialog(orderId: string) {
    console.log(orderId)
    this.dialog.open(OrdersDetailComponent, {
      data: {
        orderId: orderId
      }
    });
  }

  onCheckOrders(form: NgForm) {
    this.ordersService
      .getOrderCheck(form.value.period, form.value.code)
      .subscribe((orderResponse: Order[]) => {
        this.dataSource.data = orderResponse;
      });
  }

  search(event: Event) {
    let fliterValue = '';
    if (event) {
      fliterValue = (event.target as HTMLInputElement).value;
    }
    this.dataSource.filter = fliterValue.trim().toLowerCase();
  }
}
