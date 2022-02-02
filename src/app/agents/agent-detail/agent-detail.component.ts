import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Agent } from '../agent.model';
import { AgentsService } from '../agents.service';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.css'],
})
export class AgentDetailComponent implements OnInit {
  agent: Agent;
  id: number;

  constructor(
    private agentsService: AgentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.agent = this.agentsService.getAgent(this.id)
        }
      )
  }

  onEditAgent() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onAddLists() {
    this.router.navigate(['lists'], {relativeTo: this.route})
  }
}
