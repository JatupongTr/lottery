import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemLimit } from './setting.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(
    private http: HttpClient,
  ) {}

  private endPoint = environment.endPoint;

  createKeepPrice(toddThree: number, topThree: number, downThree: number, firstThree: number, lastThree: number, topTwo: number, downTwo: number, topRunning: number, downRunning: number) {
    const keepPrices = {
      toddThree:   toddThree,
      topThree:    topThree,
      downThree:   downThree,
      firstThree:  firstThree,
      lastThree:   lastThree,
      topTwo:      topTwo,
      downTwo:     downTwo,
      topRunning:  topRunning,
      downRunning: downRunning
    };
    return this.http.post(this.endPoint + 'settings/' , keepPrices);
  }

  deleteSettings(){
    return this.http.delete(this.endPoint + 'settings')
  }

  // Limit api

  items: ItemLimit[] = []
  itemsUpdated = new Subject<ItemLimit[]>()


  addItems(item: ItemLimit) {
    this.items.push(item)
    this.itemsUpdated.next(this.items.slice())
  }

  getItems() {
    return this.items.slice()
  }

  getItemUpdatedListner() {
    return this.itemsUpdated.asObservable();
  }

  removeItems(item: ItemLimit) {
    const index: number = this.items.indexOf(item)
    if (index !== -1) {
      this.items.splice(index, 1);
    }
    this.itemsUpdated.next(this.items.slice())
  }

  createLimitNumber(item: ItemLimit[]) {
    return this.http.post(this.endPoint + 'limit' , item);
  }

  deleteLimitNumber(){
    return this.http.delete(this.endPoint+ 'limit')
  }

}
