import { MatPaginator } from '@angular/material/paginator';
import { AgentsService } from './../agents.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private agentsService: AgentsService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.initForm();
    })
    this.ngAfterViewInit();

  }

  onEnd() {

  }

  private ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  private initForm() {
    // let agentCode = '';
    // const agent = this.agentsService.getAgent(this.id);
    // agentCode = agent.code;
    // this.summarizeForm = new FormGroup({
    //   code: new FormControl(agentCode, Validators.required)
    // })
  }
}
