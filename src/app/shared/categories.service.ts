import { HttpClient } from '@angular/common/http';
import { Category } from './category.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
/* import { ItemLimit } from '../settings/setting.model'; */
/* import { LimitNumber } from '../settings/limitNumber.model'; */

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private endPoint = environment.endPoint;

  categoriesChanged = new Subject<Category[]>();

  private categories: Category[] = [];

  constructor(private http: HttpClient) {}

  /* getCategories() {
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
              id: category._id,
            };
          });
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        this.categoriesChanged.next(this.categories);
      });
  } */

  getCategoriesNew() {
    return this.http.get<any>(this.endPoint + '/categories')
    .toPromise()
    .then(res => <Category[]>res.categories)
    .then(data => { return data; });
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

  // เลขค่าเก็บ
  putRewardPrice(_id : any , rewardPrice : any ) {
    const category = 
      {
          "rewardPrice" : rewardPrice,
      };
    return this.http.put(this.endPoint + '/categories/rewardPrice/' + _id , category);
  }

  // เลขตัวคูณ
  putPurchaseMaximum(_id : any , purchaseMaximum : any) {
    const category = 
      {
          "purchaseMaximum" : purchaseMaximum
      };
    return this.http.put(this.endPoint + '/categories/purchaseMaximum/' + _id , category);
  }

  // เลขอั้น
  createHalfPay(typeNumber: any ,rewardPrice: any , lottoNo: any) {   
    const item = 
      {
          "rewardPrice" : rewardPrice,
          "lottoNo" : lottoNo,
      }; 
      const id = typeNumber;
    return this.http.post(this.endPoint + '/categories/halfPay/' + id , item);
  }

  // ล้างเลขอั้น
  clearHalfPay() {

    return this.http.put(this.endPoint + '/categories/clear', null);
  }

}
