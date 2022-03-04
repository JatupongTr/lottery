import { Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ListsService } from '../take-lists/lists.service';
import { Agent } from './agent.model';

@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  agentChanged = new Subject<Agent[]>();

  private agents: Agent[] = [];

  // private agents: Agent[] = [
  //   new Agent(
  //     'A0001',
  //     'Jatupong',
  //     'https://images.pexels.com/photos/5504764/pexels-photo-5504764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
  //     []
  //   ),
  //   new Agent(
  //     'A0002',
  //     'Chattarin',
  //     'https://images.pexels.com/photos/4751420/pexels-photo-4751420.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //     []
  //   ),
  // ];
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
              itemLists: agent.itemLists,
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
      itemLists: [];
    }>('http://localhost:3000/api/agents/' + id);
  }

  addAgent(code: string, name: string, imagePath: string, itemLists: any) {
    const agent: Agent = {
      id: null,
      code: code,
      name: name,
      imagePath: imagePath,
      itemLists: itemLists,
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

  addLists(index: number) {
    const lists = this.listsService.getLists();
    this.agents[index].itemLists.push(...lists);
  }

  updateAgent(id: string, code: string, name:string, imagePath: string, itemLists: any) {
    const agent: Agent = {id: id, code: code, name: name, imagePath: imagePath, itemLists: itemLists }
    this.http.put("http://localhost:3000/api/agents/" + id, agent)
      .subscribe(response => {
        const updatedAgents = [...this.agents];
        const oldAgentIndex = updatedAgents.findIndex(a => a.id === agent.id);
        updatedAgents[oldAgentIndex] = agent;
        this.agents = updatedAgents;
        this.agentChanged.next([...this.agents])
        this.router.navigate(['/menu/agents'])
      })
  }
}
