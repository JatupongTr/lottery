import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Agent } from '../agent.model';
import { AgentsService } from '../agents.service';

@Component({
  selector: 'app-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.css'],
})
export class AgentListComponent implements OnInit, OnDestroy {
  agents: Agent[];
  private agentSub: Subscription;
  textSearch: string;

  displayedColumns = ['image', 'code', 'name', 'action'];
  dataSource = new MatTableDataSource<Agent>();

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private agentsService: AgentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.agentsService.getAgents();
    this.agentSub = this.agentsService.getAgentUpdatedListner()
      .subscribe((agents: Agent[]) => {
        this.dataSource.data = agents;
      })
  }

  search(event: Event) {
    let filterValue = '';
    if (event) {
      filterValue = (event.target as HTMLInputElement).value;
    }



    // search(event: Event) {
    //   let filterValue = '';
    //   if (event) {
    //     filterValue = (event.target as HTMLInputElement).value;
    //   }
    //   this.dataSource.filter = filterValue.trim().toLowerCase();
    // }

    // clearSearch() {
    // this.textSearch = '';
    // this.search(null);
  }

  onEditAgent() {
    // this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onNewAgent() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onDelete(agentId: string) {
    this.agentsService.deleteAgent(agentId);
  }

  onAddLists() {
    this.router.navigate(['lists'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.agentSub.unsubscribe();
  }
}
