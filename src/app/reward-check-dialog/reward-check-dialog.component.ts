import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/shared/orders.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../reward-check/reward-check.component';

@Component({
  selector: 'app-reward-check-dialog',
  templateUrl: './reward-check-dialog.component.html',
  styleUrls: ['./reward-check-dialog.component.css'],
})
export class RewardCheckDialogComponent implements OnInit {
  constructor(
    private ordersService: OrdersService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  lists: DialogData[];
  agent: string;
  customer: string;
  period: string;
  sumTotal: any;
  totals: any;

  dataSource = new MatTableDataSource<DialogData>();
  displayedColumns: string[] = [
    'lottoNo',
    'category',
    'price',
    'discount',
    'netPrice',
    'totalRewards',
  ];

  ngOnInit(): void {
    this.dataSource.data = this.data.lists;
    this.customer = this.data.lists[0].customer;
    this.agent = this.data.lists[0].agent.code;
    this.period = this.data.lists[0].period;
    this.totals = this.data.totals;
  }
}
