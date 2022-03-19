import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Lotto } from './lotto.model';


@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  items: Lotto[] = []
  itemsUpdated = new Subject<Lotto[]>()

  constructor() { }

  addItems(item: Lotto) {
    this.items.push(item)
    this.itemsUpdated.next(this.items.slice())
  }

  addToOrder(items: Lotto[]) {
    this.items.push(...items)
    this.itemsUpdated.next([...this.items.slice()])
  }

  getItems() {
    return this.items.slice();
  }

  getItemUpdatedListner() {
    return this.itemsUpdated.asObservable();
  }

  removeItems(item: Lotto) {
    const index: number = this.items.indexOf(item)
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.itemsUpdated.next(this.items.slice())
  }

  clearOrder() {
    this.items = []
    return this.items
  }
}
