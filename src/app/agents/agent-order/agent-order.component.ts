import { ItemsService } from './../../shared/items.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Agent } from '../agent.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AgentsService } from '../agents.service';
import { OrdersService } from 'src/app/shared/orders.service';
import { Item, Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-agent-order',
  templateUrl: './agent-order.component.html',
  styleUrls: ['./agent-order.component.css'],
})
export class AgentOrderComponent implements OnInit {
  selectNumbersType: string = 'two-numbers';
  p: number = 1;
  items: Item[];
  orders: Order[]
  agent: Agent;
  private agentId: string;
  private itemsChangeSub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private agentsService: AgentsService,
    private ordersService: OrdersService,
    private itemsService: ItemsService,
    private router: Router
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
          };
        });
      }
    });
    this.items = this.itemsService.getItems();
    this.itemsChangeSub = this.itemsService.itemsUpdated.subscribe(
      (items: Item[]) => {
        this.items = items;
      }
    );
  }

  onSelect(select: string) {
    this.selectNumbersType = select;
  }

  onRemove(item: Item) {
    this.itemsService.removeItems(item);
  }

  onSaveLists(form: NgForm) {
    this.ordersService.createOrder(
      this.agentId,
      form.value.customer,
      form.value.period,
      this.items,
    ).subscribe((responseData) => {
      this.router.navigate(['/menu/order/totals'], { queryParams: { 'agentId': this.agentId, 'period': form.value.period } });
    });
  }
  
}

