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

  createOrder(agentId: any, customer: string, period: any, items: any) {
    const order = {
      agentId: agentId,
      customer: customer,
      items: items,
      period: period,
    };
    return this.http.post(this.endPoint + '/orders/' + agentId, order);
  }

  getOrderUpdatedListner() {
    return this.orderChanged.asObservable();
  }

  getTotal(agentId: string, period: string) {
    return this.http.get(
      this.endPoint + '/orders/totals/' + agentId + '/' + period
    );
  }

  getTotals(agentId: string, period: string) {
    return this.http.get(
      this.endPoint + '/orders/total/' + agentId + '/' + period
    );
  }

  getTotalsCategory(agentId: string, period: string) {
    return this.http.get(
      this.endPoint + '/orders/total/category/' + agentId + '/' + period
    );
  }

  removeItems(itemId: string, items: any) {
    let data = {
      id: items,
    };
    return this.http.post(this.endPoint + '/orders/remove/' + itemId, data);
  }

  getRewards(period: any) {
    return this.http.get(this.endPoint + '/rewards/' + period);
  }

  checkRewards(
    period: string,
    firstPrize: string,
    downTwoPrize: string,
    lastThreePrize1: string,
    lastThreePrize2: string,
    firstThreePrize1: string,
    firstThreePrize2: string
  ) {
    const data = {
      period: period,
      firstPrize: firstPrize,
      downTwoPrize: downTwoPrize,
      lastThreePrize1: lastThreePrize1,
      lastThreePrize2: lastThreePrize2,
      firstThreePrize1: firstThreePrize1,
      firstThreePrize2: firstThreePrize2
    }
    return this.http.post(this.endPoint + '/rewards', data);
  }

  getOrderCheck(period: any, code: string) {
    return this.http.get(this.endPoint + '/orders/check/' + period);
  }

  getItemsOrder(orderId: string) {
    return this.http.get(this.endPoint + '/orders/' + orderId);
  }

  getCountOrders() {
    return this.http.get(this.endPoint + '/count_orders')
  }



}
