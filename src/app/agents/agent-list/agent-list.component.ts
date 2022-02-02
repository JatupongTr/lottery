import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Agent } from '../agent.model';
import { AgentsService } from '../agents.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css'],
})
export class AgentListComponent implements OnInit {
  agents: Agent[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator

  constructor(
    private agentsService: AgentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.agentsService.agentChanged.subscribe(
      (agents: Agent[]) => {
        this.agents = agents;
      }
    )
    this.agents = this.agentsService.getAgents();
  }

  onNewAgent() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
