import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { List } from '../take-lists/list.model';
import { Category } from '../shared/category.model';

@Injectable({
  providedIn: 'root',
})
export class ListsService {
  listsUpdated = new Subject<List[]>();
  categoriesChanged = new Subject<Category[]>();
  private lists: List[] = [];
  private categories: Category[] = [];

  constructor(private http: HttpClient) {}

  getCategories() {
    this.http.get<{ message: string, categories: any }>('http://localhost:3000/api/categories')
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              cate_id: category.cate_id,
              cate_name: category.cate_name,
              description: category.description,
              id: category._id,
            }
          })
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        this.categoriesChanged.next(this.categories)
      })
  }

  getCategoriesTwo() {
    this.http.get<{ message: string, categories: any }>("http://localhost:3000/api/categories/two")
      .pipe(
        map((cateData) => {
          return cateData.categories.map(category => {
            return {
              cate_id: category.cate_id,
              cate_name: category.cate_name,
              description: category.description,
              id: category._id
            }
          })
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        return this.categoriesChanged.next(this.categories)
      })
  }
  getCategoriesRunning() {
    this.http.get<{ message: string, categories: any }>('http://localhost:3000/api/categories/running')
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              cate_id: category.cate_id,
              cate_name: category.cate_name,
              description: category.description,
              id: category._id,
            }
          })
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        this.categoriesChanged.next(this.categories)
      })
  }
  getCategoriesThree() {
    this.http.get<{ message: string, categories: any }>('http://localhost:3000/api/categories/three')
      .pipe(
        map((categoryData) => {
          return categoryData.categories.map((category) => {
            return {
              cate_id: category.cate_id,
              cate_name: category.cate_name,
              description: category.description,
              id: category._id,
            }
          })
        })
      )
      .subscribe((transformedData) => {
        this.categories = transformedData;
        this.categoriesChanged.next(this.categories)
      })
  }
  getLists() {
    return this.lists.slice();
  }

  getCategoryUpdatedListener() {
    return this.categoriesChanged.asObservable();
  }

  addList(list: List) {
    this.lists.push(list);
    this.listsUpdated.next([...this.lists.slice()]);
  }

  removeList(list: List) {
    const index: number = this.lists.indexOf(list);
    if (index !== -1) {
      this.lists.splice(index, 1);
    }
    this.listsUpdated.next(this.lists.slice());
  }
}
