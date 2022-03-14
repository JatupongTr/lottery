import { Subscription } from 'rxjs';
import { List } from './../../take-lists/list.model';
import { ListsService } from './../../take-lists/lists.service';
import { Agent } from './../agent.model';
import { MatPaginator } from '@angular/material/paginator';
import { AgentsService } from './../agents.service';
import { ActivatedRoute, Params, Router, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-agent-summarize',
  templateUrl: './agent-summarize.component.html',
  styleUrls: ['./agent-summarize.component.css']
})

export class AgentSummarizeComponent implements OnInit {
  id: number;
  summarizeForm: FormGroup
  displayedColumns: string[] = ['list_no', 'category', 'price', 'discount', 'netPrice', 'action']
  dataSource = new MatTableDataSource<List>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator,  {static: true}) paginator: MatPaginator;

  agent: Agent;
  lists: List[]
  private agentId: string;
  private listChangeSub: Subscription;
  constructor(private route: ActivatedRoute, private agentsService: AgentsService, private router: Router, private listsService: ListsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('agentId')) {
        this.agentId = paramMap.get('agentId');
        this.agentsService.getAgent(this.agentId).subscribe((agentData) => {
          this.agent = {
            id: agentData._id,
            code: agentData.code,
            name: agentData.name,
            imagePath: agentData.imagePath,
            order: agentData.order
          };
          console.log(this.agent)
        });
      }
    })

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onSaveList(form: NgForm) {}

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
