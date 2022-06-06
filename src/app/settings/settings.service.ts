import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
/* import { ItemLimit } from './setting.model';
import { LimitNumber } from './limitNumber.model'; */

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

  // Limit api

/*   items: ItemLimit[] = []
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
  } */

  // limit number
/*   createLimitNumber(item: ItemLimit[]) {
    return this.http.post(this.endPoint + '/limit' , item);
  }

  getLimitNumber() {
    return this.http.get<any>(this.endPoint + '/limit')
    .toPromise()
    .then(res => <LimitNumber[]>res.Limit)
    .then(data => { return data; });;
  }

  deleteLimitNumber(){
    return this.http.delete(this.endPoint+ '/limit')
  } */

}
