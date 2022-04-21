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

  lists: DialogData[]

  dataSource = new MatTableDataSource<DialogData>();
  displayedColumns: string[] = [
    'lottoNo',
    'category',
    'price',
    'discount',
    'netPrice',
  ];

  ngOnInit(): void {
    this.dataSource.data = this.data.lists
  }
}
