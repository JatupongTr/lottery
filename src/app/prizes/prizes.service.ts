import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Prize } from './prize.model';

@Injectable({
  providedIn: 'root',
})
export class PrizesService {
  prizesChanged = new Subject<Prize[]>();
  private prizes: Prize[] = [];
  constructor(private http: HttpClient) {}

  addPrize(prize: Prize) {
    this.http
      .post(
        'https://lottery-admin-90054-default-rtdb.asia-southeast1.firebasedatabase.app/prize.json',
        prize
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }
}
