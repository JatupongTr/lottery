
import { Order } from './order.model';

import { ItemsService } from './items.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private items: Item[];
  private orders: Order[];
  orderChanged = new Subject<Order[]>();
  private endPoint = environment.endPoint;
  constructor(
    private http: HttpClient,
    router: Router,
    private itemsService: ItemsService
  ) {}

  createOrder(agentId: any, period: any, items: any) {
    const order: Order = {
      agentId: agentId,
      items: items,
      period: period,
    }
    return this.http.post(this.endPoint + "orders/" + agentId, order)
  }

  getOrder() {}
}
