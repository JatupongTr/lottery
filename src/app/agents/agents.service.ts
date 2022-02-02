
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Agent } from './agent.model';

@Injectable({
  providedIn: 'root'
})
export class AgentsService {

  agentSelected = new Subject<Agent>();
  agentChanged = new Subject<Agent[]>();

  private agents: Agent[] = [
    new Agent(
      'A0001',
      'Jatupong',
      'https://images.pexels.com/photos/5504764/pexels-photo-5504764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      []
    ),
    new Agent(
      'A0002',
      'Chattarin',
      'https://images.pexels.com/photos/4751420/pexels-photo-4751420.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      []
    ),
  ]
  constructor() { }

  getAgents() {
    return this.agents.slice();
  }

  getAgent(index: number) {
    return this.agents[index];
  }

  addAgent(agent: Agent) {
    this.agents.push(agent)
    this.agentChanged.next(this.agents.slice())
  }

  updateAgent(index: number, newAgent: Agent) {
    this.agents[index] = newAgent;
    this.agentChanged.next(this.agents.slice())
  }
}
