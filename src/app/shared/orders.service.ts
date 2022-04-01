import { Order, OrderResponse } from './order.model';

import { ItemsService } from './items.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Item } from './item.model';
import { map } from 'rxjs/operators';

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
    const order = {
      agentId: agentId,
      items: items,
      period: period,
    };
    return this.http.post(this.endPoint + 'orders/' + agentId, order);
  }

  getOrderUpdatedListner() {
    return this.orderChanged.asObservable();
  }

  getTotal(agentId: string, period: string) {
    return this.http.get(
      this.endPoint + 'orders/totals/' + agentId + '/' + period
    );
  }

  getTotals(agentId: string, period: string) {
    return this.http.get(
      this.endPoint + 'orders/total/' + agentId + '/' + period
    );
  }

  getTotalsCategory(agentId: string, period: string) {
    return this.http.get(
      this.endPoint + 'orders/total/category/' + agentId + '/' + period
    );
  }

  removeItems(itemId: string, items: any) {
    let data = {
      id: items,
    };
    return this.http.post(this.endPoint + 'orders/remove/' + itemId, data);
  }

  getRewards(period: string) {
    return this.http
      .get<{
        orders: any;
      }>(this.endPoint + 'reward/' + period)
      .pipe(
        map((orderData) => {
          return orderData.orders.map((order) => {
            return {
              items: order.items,
              agentId: order.agentId,
              period: order.period,
              id: order._id,
            };
          });
        })
      );
  }

  getOrders() {
    return this.http.get<{ orders: any }>(this.endPoint + 'orders').pipe(
      map((orderData) => {
        return orderData.orders.map((order) => {
          return {
            items: order.items,
            agentId: order.agentId,
            period: order.period,
            id: order._id,
          };
        });
      })
    );
  }

  getCountOrders() {

    return this.http.get(this.endPoint + 'count_orders')

  }



}
