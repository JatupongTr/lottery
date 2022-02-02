
import { Component, Input, OnInit } from '@angular/core';
import { Agent } from '../../agent.model';

@Component({
  selector: 'app-agent-item',
  templateUrl: './agent-item.component.html',
  styleUrls: ['./agent-item.component.css']
})
export class AgentItemComponent implements OnInit {
  @Input() agent: Agent;
  @Input() index: number;
  constructor() { }

  ngOnInit(): void {
  }

}
