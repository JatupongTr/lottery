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

  totalNet: "";
  totalTopTwoDigits: "";
  totalDownTwoDigits: "";
  totalTopRunDigits: "";
  totalDownRunDigits: "";
  totalTopThreeDigits: "";
  totalDownThreeDigits: "";
  totalFirstThreeDigits: "";
  totalLastThreeDigits: "";
  totalToddThreeDigits: "";

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
      this.ordersService.getTotal(this.agentId, this.period)
        .subscribe((res: any) => {
          this.dataSource.data = res.Orders[0].items
          this.period = res.Orders[0].period
          this.agentId = res.Orders[0].agentId.code
          this.orderId = res.Orders[0]._id
        })
      this.ordersService.getTotals(this.agentId, this.period)
        .subscribe((total: any) => {
          this.totalNet = total.Orders[0].netTotal
        })
      this.ordersService.getTotalsCategory(this.agentId, this.period)
        .subscribe((totalCategory: any) => {
          if (totalCategory) {
            let order = totalCategory.orders
            for (let i = 0; i < order.length; i++) {
              if (order[i]._id === "downThreeDigits") {
                this.totalDownThreeDigits = order[i].totals
              } else if (order[i]._id === "downTwoDigits") {
                this.totalDownTwoDigits = order[i].totals
              } else if (order[i]._id === "toddThreeDigits") {
                this.totalToddThreeDigits = order[i].totals
              } else if (order[i]._id === "topRunDigits") {
                this.totalTopRunDigits = order[i].totals
              } else if (order[i]._id === "topThreeDigits") {
                this.totalTopThreeDigits = order[i].totals
              } else if (order[i]._id === "downRunDigits") {
                this.totalDownRunDigits = order[i].totals
              } else if (order[i]._id === "lastThreeDigits") {
                this.totalLastThreeDigits = order[i].totals
              } else if (order[i]._id === "firstThreeDigits") {
                this.totalFirstThreeDigits = order[i].totals
              } else if (order[i]._id === "topTwoDigits") {
                this.totalTopTwoDigits = order[i].totals
              }
            }
          }
        })
    })
  }

  onRemoveItem(items: any) {
    this.ordersService.removeItems(this.orderId, items).subscribe(() => {
      window.location.reload();
    })
    // this.agentsService.removeItemFromOrder(this.agentId, items).subscribe(() => {
    //   window.location.reload();
    // })
  }

  private initForm() {}

  onSaveList(form: NgForm) {}
}
