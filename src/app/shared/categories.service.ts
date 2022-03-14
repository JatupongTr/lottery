import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/shared/category.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categoriesChanged = new Subject<Category[]>();

  private categories: Category[] = []

  constructor(private http: HttpClient) { }

  getCategories() {
    this.http.get<{ message: string, categories: any }>("http://localhost:3000/api/categories")
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

  getCategoryUpdatedListener() {
    return this.categoriesChanged.asObservable();
  }
}
