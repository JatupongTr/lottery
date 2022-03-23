import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: Item[] = []
  itemsUpdated = new Subject<Item[]>()

  constructor() {}

  addItems(item: Item) {
    this.items.push(item)
    this.itemsUpdated.next(this.items.slice())
  }

  addToOrder(items: Item[]){
    this.items.push(...items)
    this.itemsUpdated.next([...this.items.slice()])
  }

  getItems() {
    return this.items.slice()
  }

  getItemUpdatedListner() {
    return this.itemsUpdated.asObservable();
  }

  removeItems(item: Item) {
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
