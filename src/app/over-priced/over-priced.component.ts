import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-over-priced',
  templateUrl: './over-priced.component.html',
  styleUrls: ['./over-priced.component.css']
})
export class OverPricedComponent implements OnInit {

  displayedColumns = ['lottoNo', 'category', 'price'];
  dataSource = new MatTableDataSource();
  constructor() { }

  ngOnInit(): void {
  }

}
