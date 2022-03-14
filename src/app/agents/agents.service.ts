import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListsService } from '../take-lists/lists.service';
import { Agent } from './agent.model';
import { List } from '../take-lists/list.model';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  agentChanged = new Subject<Agent[]>();

  private agents: Agent[] = [];
  private lists: List[] = [];

  constructor(
    private listsService: ListsService,
    private http: HttpClient,
    private router: Router
  ) {}

  getAgents() {
    this.http
      .get<{ message: string; agents: any }>('http://localhost:3000/api/agents')
      .pipe(
        map((agentData) => {
          return agentData.agents.map((agent) => {
            return {
              code: agent.code,
              name: agent.name,
              imagePath: agent.imagePath,
              order: agent.order,
              id: agent._id,
            };
          });
        })
      )
      .subscribe((transformedAgent) => {
        this.agents = transformedAgent;
        this.agentChanged.next([...this.agents]);
      });
  }

  getAgentUpdatedListner() {
    return this.agentChanged.asObservable();
  }

  getAgent(id: string) {
    return this.http.get<{
      _id: string;
      code: string;
      name: string;
      imagePath: string;
      order: [];
    }>('http://localhost:3000/api/agents/' + id);
  }

  addAgent(code: string, name: string, imagePath: string, order: any) {
    const agent: Agent = {
      id: null,
      code: code,
      name: name,
      imagePath: imagePath,
      order: order
    };
    this.http
      .post<{ message: string; agentId: string }>(
        'http://localhost:3000/api/agents',
        agent
      )
      .subscribe((responseData) => {
        const id = responseData.agentId;
        agent.id = id;
        this.agents.push(agent);
        this.agentChanged.next([...this.agents]);
        this.router.navigate(['/menu/agents']);
      });
  }

  addLists() {

  }

  deleteAgent(agentId: string) {
    this.http
      .delete('http://localhost:3000/api/agents/' + agentId)
      .subscribe(() => {
        const updatedAgents = this.agents.filter(
          (agent) => agent.id !== agentId
        );
        this.agents = updatedAgents;
        this.agentChanged.next([...this.agents]);
      });
  }

  // addLists(id: string, code: string, name:string, imagePath: string, list: any) {
  //   const agent: Agent = {id: id, code: code, name: name, imagePath: imagePath, itemLists: list }
  //   this.http.put("http://localhost:3000/api/agents/lists/" + id, agent)
  //     .subscribe(response => {
  //       const updatedAgents = [...this.agents];
  //       const oldAgentIndex = updatedAgents.findIndex(a => a.id === agent.id);
  //       updatedAgents[oldAgentIndex] = agent;
  //       this.agents = updatedAgents;
  //       this.agentChanged.next([...this.agents])
  //       // this.router.navigate(['/menu/agents'])
  //     })
  // }

  updateAgent(
    id: string,
    code: string,
    name: string,
    imagePath: string,
    order: any
  ) {
    const agent: Agent = {
      id: id,
      code: code,
      name: name,
      imagePath: imagePath,
      order: order
    };
    this.http
      .put('http://localhost:3000/api/agents/' + id, agent)
      .subscribe((response) => {
        const updatedAgents = [...this.agents];
        const oldAgentIndex = updatedAgents.findIndex((a) => a.id === agent.id);
        updatedAgents[oldAgentIndex] = agent;
        this.agents = updatedAgents;
        this.agentChanged.next([...this.agents]);
        this.router.navigate(['/menu/agents']);
      });
  }
}
