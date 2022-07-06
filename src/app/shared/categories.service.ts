import { HttpClient } from '@angular/common/http';
import { Category, HalfPay } from './category.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HalfPayResponse } from './halfPayResponse.model';
/* import { ItemLimit } from '../settings/setting.model'; */
/* import { LimitNumber } from '../settings/limitNumber.model'; */

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private endPoint = environment.endPoint;

  categoriesChanged = new Subject<Category[]>();

  private categories: Category[] = [];

  halfPayChanged = new Subject<HalfPayResponse[]>();

  constructor(private http: HttpClient) {}

  getHalfPayUpdateListener() {
    return this.halfPayChanged.asObservable()
  }

  getHalfPay() {
    return this.http.get(this.endPoint + "/categories/halfpay")
  }

  getCategories() {
    this.http
      .get<{ message: string; categories: any }>(this.endPoint + '/categories')
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              cate_id: category.cate_id,
              cate_name: category.cate_name,
              description: category.description,
              rewardPrice: category.rewardPrice,
              purchaseMaximum: category.purchaseMaximum,
              purchaseAmount: category.purchaseAmount,
              purchaseBalance: category.purchaseBalance,
              halfPayReward: category.halfPayReward,
              halfPay: category.halfPay,
              available: category.available,
              id: category._id,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        this.categoriesChanged.next([...this.categories]);
      });
  }

  getCategoriesNew() {
    return this.http
      .get<any>(this.endPoint + '/categories')
      .toPromise()
      .then((res) => <Category[]>res.categories)
      .then((data) => {
        return data;
      });
  }

  getCategoriesTwo() {
    this.http
      .get<{ message: string; categories: any }>(
        this.endPoint + '/categories/two'
      )
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              cate_id: category.cate_id,
              cate_name: category.cate_name,
              description: category.description,
              rewardPrice: category.rewardPrice,
              purchaseMaximum: category.purchaseMaximum,
              purchaseAmount: category.purchaseAmount,
              purchaseBalance: category.purchaseBalance,
              halfPayReward: category.halfPayReward,
              halfPay: category.halfPay,
              available: category.available,
              id: category._id,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        this.categoriesChanged.next(this.categories);
      });
  }

  getCategoriesThree() {
    this.http
      .get<{ message: string; categories: any }>(
        this.endPoint + '/categories/three'
      )
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              cate_id: category.cate_id,
              cate_name: category.cate_name,
              description: category.description,
              rewardPrice: category.rewardPrice,
              purchaseMaximum: category.purchaseMaximum,
              purchaseAmount: category.purchaseAmount,
              purchaseBalance: category.purchaseBalance,
              halfPayReward: category.halfPayReward,
              halfPay: category.halfPay,
              available: category.available,
              id: category._id,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        this.categoriesChanged.next(this.categories);
      });
  }

  getCategoryUpdatedListener() {
    return this.categoriesChanged.asObservable();
  }

  // ตัวคูณ
  putRewardPrice(_id: any, rewardPrice: number, halfPayReward: number) {
    const category = {
      rewardPrice: rewardPrice,
      halfPayReward: halfPayReward
    };
    return this.http.put(
      this.endPoint + '/categories/rewardPrice/' + _id,
      category
    );
  }

  // ยอดซื้อสูงสุด
  putPurchaseMaximum(_id: any, purchaseMaximum: number) {
    const category = {
      purchaseMaximum: purchaseMaximum,
    };
    return this.http.put(
      this.endPoint + '/categories/purchaseMaximum/' + _id,
      category
    );
  }

  // เลขอั้น
  createHalfPay(id: any, lottoNo: any) {
    const item = {
      id: id,
      lottoNo: lottoNo,
    };
    return this.http.post(this.endPoint + '/categories/halfPay', item);
  }

  // ลบเลขอั้น
  removeHalfpay(id: string, halfPayId: string){
    let data = {
      halfPayId: halfPayId
    }
    return this.http.post(this.endPoint + '/categories/remove/' + id, data)
  }

  // ล้างเลขอั้น
  clearHalfPay() {
    return this.http.put(this.endPoint + '/categories/clear', null);
  }

  // reset setting
  resetSetting() {
    return this.http.put(this.endPoint + '/categories/reset', null)
  }
}
