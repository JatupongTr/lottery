import { OrdersService } from 'src/app/shared/orders.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Agent } from './agent.model';
import { Category } from '../shared/category.model';

export interface Order {
  items: Item[];
}
export interface Item {
  lotto_no: string;
  price: number;
  discount: number;
  net_price: number;
  category: Category;
  _id: string;
}
@Injectable({
  providedIn: 'root',
})
export class AgentsService {
  agentChanged = new Subject<Agent[]>();

  private agents: Agent[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private ordersService: OrdersService
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

  addAgent(code: string, name: string, imagePath: string) {
    const agent: Agent = {
      id: null,
      code: code,
      name: name,
      imagePath: imagePath,
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

  updateAgent(
    id: string,
    code: string,
    name: string,
    imagePath: string,
  ) {
    const agent: Agent = {
      id: id,
      code: code,
      name: name,
      imagePath: imagePath,
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
