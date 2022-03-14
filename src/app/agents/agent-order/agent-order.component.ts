import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Agent } from '../agent.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AgentsService } from '../agents.service';
import { OrdersService } from 'src/app/shared/orders.service';
import { Lotto } from 'src/app/shared/lotto.model';

@Component({
  selector: 'app-agent-order',
  templateUrl: './agent-order.component.html',
  styleUrls: ['./agent-order.component.css'],
})
export class AgentOrderComponent implements OnInit {
  selectNumbersType: string = 'two-numbers';
  p: number = 1;
  items: Lotto[];
  agent: Agent
  private agentId: string
  private itemsChangeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private agentsService: AgentsService,
    private ordersService: OrdersService
  ) {}

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
            order: agentData.order,
          };
          console.log(this.agent);
        });
      }
    });
    this.items = this.ordersService.getItems();
    this.itemsChangeSub = this.ordersService.itemsUpdated.subscribe(
      (items: Lotto[]) => {
        this.items = items
      }
    )
  }

  onSelect(select: string) {
    this.selectNumbersType = select;
  }

  onRemove(item: Lotto) {
    this.ordersService.removeItems(item)
  }

  onSaveLists(form: NgForm) {}
}
