import { Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { Category } from "./category.model";
import { Lottery } from "./lottery.model";

@Injectable({
  providedIn: 'root'
})
export class LotteriesService {
  private lotteries: Lottery[] = [];
  private categories: Category[] = [];

  lotteriesUpdated = new Subject<Lottery[]>()

  constructor() {}

  getLotteries() {
    return this.lotteries.slice();
  }

  addLottery(lottery: Lottery) {
    this.lotteries.push(lottery);
    this.lotteriesUpdated.next([...this.lotteries.slice()])
  }
}
