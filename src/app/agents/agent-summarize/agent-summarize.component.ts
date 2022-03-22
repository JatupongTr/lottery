
import { Agent } from './../agent.model';
import { MatPaginator } from '@angular/material/paginator';
import { AgentsService } from './../agents.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
@Component({
  selector: 'app-agent-summarize',
  templateUrl: './agent-summarize.component.html',
  styleUrls: ['./agent-summarize.component.css'],
})
export class AgentSummarizeComponent implements OnInit {
  id: number;
  summarizeForm: FormGroup;
  displayedColumns: string[] = [
    'lotto_no',
    'category',
    'price',
    'discount',
    'net_price',
    'action',
  ];
  dataSource = new MatTableDataSource<Agent>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  agent: Agent;
  private agentId: string;

  constructor(
    private route: ActivatedRoute,
    private agentsService: AgentsService,
  ) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('agentId')) {
        this.agentId = paramMap.get('agentId');
        this.agentsService
          .getAgentOrder(this.agentId)
          .subscribe((agentData) => {
            this.agent = {
              id: agentData._id,
              code: agentData.code,
              name: agentData.name,
              imagePath: agentData.imagePath,
              order: agentData.order,
            };
            console.log(agentData)
            this.dataSource.data = agentData.order.items
          });
      }
    });
  }

  onRemoveItem(items: any) {
    this.agentsService.removeItemFromOrder(this.agentId, items).subscribe(() => {
      window.location.reload();
    })
  }

  private initForm() {}

  onSaveList(form: NgForm) {}
}
