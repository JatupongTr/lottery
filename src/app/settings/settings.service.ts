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

  getTotalOrders() {
    return this.http.get(
    this.endPoint + '/settings' + '/totalOrders');
  }

  // Add getKeepPrice api
  /* getKeepPrice() {
    return this.http.get(
    this.endPoint + '/settings');
  }

  createKeepPrice(toddThreeDigits: number, topThreeDigits: number, downThreeDigits: number, firstThreeDigits: number, lastThreeDigits: number, topTwoDigits: number, downTwoDigits: number, topRunDigits: number, downRunDigits: number) {
    const keepPrices = {
      toddThreeDigits:   toddThreeDigits,
      topThreeDigits:    topThreeDigits,
      downThreeDigits:   downThreeDigits,
      firstThreeDigits:  firstThreeDigits,
      lastThreeDigits:   lastThreeDigits,
      topTwoDigits:      topTwoDigits,
      downTwoDigits:     downTwoDigits,
      topRunDigits:  topRunDigits,
      downRunDigits: downRunDigits
    };
    return this.http.post(this.endPoint + '/settings/' , keepPrices);
  }

  deleteSettings(){
    return this.http.delete(this.endPoint + '/settings')
  } */

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
    return this.http.post(this.endPoint + '/limit' , item);
  }

  deleteLimitNumber(){
    return this.http.delete(this.endPoint+ '/limit')
  }

  //limit num
  getLimitPrice(){
    return this.http.get(this.endPoint+ '/limitPrice')
  }

  //post limit num
  postLimitNum(toddThreeDigits: number, topThreeDigits: number, downThreeDigits: number, firstThreeDigits: number, lastThreeDigits: number, topTwoDigits: number, downTwoDigits: number, topRunDigits: number, downRunDigits: number) {
    const limitPrices = [
      {
          "limitPrice" : toddThreeDigits,
          "category": "623966cadb01ff9ee525f1df"
      },
      {
          "limitPrice" : topThreeDigits,
          "category": "623966e2db01ff9ee525f1e1"
      },
      {
          "limitPrice" : downThreeDigits,
          "category": "623966f7db01ff9ee525f1e3"
      },
      {
          "limitPrice" : firstThreeDigits,
          "category": "623966b9db01ff9ee525f1dd"
      },
      {
          "limitPrice" : lastThreeDigits,
          "category": "62396709db01ff9ee525f1e5"
      },
      {
          "limitPrice" : topTwoDigits,
          "category": "62396645db01ff9ee525f1d5"
      },
      {
          "limitPrice" : downTwoDigits,
          "category": "62396654db01ff9ee525f1d7"
      },
      {
          "limitPrice" : topRunDigits,
          "category": "6239666ddb01ff9ee525f1d9"
      },
      {
          "limitPrice" : downRunDigits,
          "category": "6239667edb01ff9ee525f1db"
      }
    ];
    return this.http.post(this.endPoint + '/limitPrice/' , limitPrices);
  }

  deleteLimitPrice(){
    return this.http.delete(this.endPoint+ '/limitPrice')
  }

}
