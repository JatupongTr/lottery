import { OrdersService } from 'src/app/shared/orders.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-over-priced',
  templateUrl: './over-priced.component.html',
  styleUrls: ['./over-priced.component.css']
})
export class OverPricedComponent implements OnInit {

  displayedColumns = ['position','lottoNo', 'category', 'price'];
  totals: number;
  dataSource = new MatTableDataSource();
  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {

  }

  onOverPriceCheck(form: NgForm) {
    this.ordersService.getOverPrice(form.value.period)
      .subscribe((res: any[])=>{
        console.log(res)
        this.dataSource.data = res
        this.totals = res[0].totals
      })
  }

}
