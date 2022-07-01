import { Component, OnInit } from '@angular/core';

// New Agents
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Agent } from '../agents/agent.model';
import { AgentsService } from '../agents/agents.service';

// get orders
import { OrdersService } from '../shared/orders.service';
import { Order } from '../shared/order.model';
import { NotificationsService } from '../shared/notifications.service';

@Component({
    selector: 'app-overviews',
    templateUrl: './overviews.component.html',
    styleUrls: ['./overviews.component.css']
})
export class OverviewsComponent implements OnInit {


  defaultImage: string;

  // get orders
  orders: Order[];
  private ordersSub: Subscription;

  dataOrders = new MatTableDataSource<Order>();

  // New Agents
  agents: Agent[];
  private agentSub: Subscription;
  textSearch: string;

  countOrders : string;
  newNoti = [];


  displayedColumns = ['image', 'code', 'name', 'more'];
  dataSource = new MatTableDataSource<Agent>();

  constructor(
    private agentsService: AgentsService,
    private ordersService: OrdersService,
    private notisService: NotificationsService
  ) {}

  ngOnInit() {
    // New Agents
    this.defaultImage = './assets/images/account.png'
    this.agentsService.getNewAgent().subscribe((res: any) => {
      if (res) {
        res.agents.splice(-1)
        this.dataSource.data = res.agents
      } else {
        this.dataSource.data = null
      }
    })
    // get oders
    this.ordersService.getCountOrders().subscribe(( res : any ) => {
      this.countOrders = res.orders;
    })

    //get new Notifications
    this.notisService.getNewNotification().subscribe((res: any) => {
      if (res) {
        this.newNoti = res
      } else {
        this.newNoti = [];
      }
    })
  }

}
