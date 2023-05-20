import { OrdersService } from 'src/app/shared/orders.service';

import { Agent } from './../agent.model';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Order } from 'src/app/shared/order.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-agent-summarize',
  templateUrl: './agent-summarize.component.html',
  styleUrls: ['./agent-summarize.component.css'],
})
export class AgentSummarizeComponent implements OnInit {
  id: number;
  summarizeForm: FormGroup;
  displayedColumns: string[] = [
    'lottoNo',
    'categoryId',
    'price',
    'discount',
    'netPrice',
    'action',
  ];

  dataSource = new MatTableDataSource<Order>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  order: Order;
  agent: Agent;
  agentId: string;
  period: string;
  orderId: string;

  totalNet: '';
  totalTopTwoDigits: '';
  totalDownTwoDigits: '';
  totalTopRunDigits: '';
  totalDownRunDigits: '';
  totalTopThreeDigits: '';
  totalDownThreeDigits: '';
  totalFirstThreeDigits: '';
  totalLastThreeDigits: '';
  totalToddThreeDigits: '';

  private orderSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.route.queryParams.subscribe((params) => {
      this.agentId = params.agentId;
      this.period = params.period;
      this.ordersService
        .getTotal(this.agentId, this.period)
        .subscribe((res: any) => {
          if (res.Orders && res.Orders[0]) {
            this.dataSource.data = res.Orders[0].items;
            this.period = res.Orders[0].period;
            this.agentId = res.Orders[0].agentId.code;
            this.orderId = res.Orders[0]._id;
          }
        });
      this.ordersService
        .getTotals(this.agentId, this.period)
        .subscribe((total: any) => {
          if (total.Orders && total.Orders[0]) {
            this.totalNet = total.Orders[0].netTotal;
          }
        });
      this.ordersService
        .getTotalsCategory(this.agentId, this.period)
        .subscribe((totalCategory: any) => {
          if (totalCategory) {
            let order = totalCategory.orders;
            for (let i = 0; i < order.length; i++) {
              if (order[i]._id === '62396709db01ff9ee525f1e5') {
                this.totalDownThreeDigits = order[i].totals;
              } else if (order[i]._id === '64590e3f3c8573ced0c89c34') {
                this.totalDownTwoDigits = order[i].totals;
              } else if (order[i]._id === '64590efb3c8573ced0c89c47') {
                this.totalToddThreeDigits = order[i].totals;
              } else if (order[i]._id === '64590e763c8573ced0c89c39') {
                this.totalTopRunDigits = order[i].totals;
              } else if (order[i]._id === '64590ece3c8573ced0c89c45') {
                this.totalTopThreeDigits = order[i].totals;
              } else if (order[i]._id === '64590e853c8573ced0c89c3b') {
                this.totalDownRunDigits = order[i].totals;
              } else if (order[i]._id === '64590ebe3c8573ced0c89c43') {
                this.totalLastThreeDigits = order[i].totals;
              } else if (order[i]._id === '64590eab3c8573ced0c89c41') {
                this.totalFirstThreeDigits = order[i].totals;
              } else if (order[i]._id === '64590e1b3c8573ced0c89c2c') {
                this.totalTopTwoDigits = order[i].totals;
              }
            }
          }
        });
    });
  }

  onRemoveItem(items: any) {
    this.ordersService.removeItems(this.orderId, items).subscribe(() => {
      window.location.reload();
    });
    // this.agentsService.removeItemFromOrder(this.agentId, items).subscribe(() => {
    //   window.location.reload();
    // })
  }

  private initForm() {}

  onSaveList(form: NgForm) {}
}
