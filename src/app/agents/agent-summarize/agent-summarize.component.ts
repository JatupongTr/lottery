import { MatPaginator } from '@angular/material/paginator';
import { AgentsService } from './../agents.service';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface ItemList {
  list_no: string;
  category: string;
  price: number;
  discount: number;
  netPrice: number;
}

const LIST_DATA: ItemList[] = [
  {list_no: '00', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '01', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '02', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '03', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '04', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '05', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '06', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '07', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '08', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
  {list_no: '09', category: 'ล่าง', price: 100, discount: 20, netPrice: 80},
];

@Component({
  selector: 'app-agent-summarize',
  templateUrl: './agent-summarize.component.html',
  styleUrls: ['./agent-summarize.component.css']
})

export class AgentSummarizeComponent implements OnInit {
  id: number;
  summarizeForm: FormGroup
  displayedColumns: string[] = ['list_no', 'category', 'price', 'discount', 'netPrice', 'action']
  dataSource = new MatTableDataSource<ItemList>(LIST_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute, private agentsService: AgentsService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.initForm();
    })
    this.ngAfterViewInit();

  }

  private ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  private initForm() {
    let agentCode = '';
    const agent = this.agentsService.getAgent(this.id);
    agentCode = agent.code;
    this.summarizeForm = new FormGroup({
      code: new FormControl(agentCode, Validators.required)
    })
  }




}
