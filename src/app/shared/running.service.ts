import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Category } from "./category.model";

@Injectable({
  providedIn: 'root'
})

export class RunningService {
  categoriesChanged = new Subject<Category[]>();

  private endPoint = environment.endPoint;
  private categories: Category[] = []

  constructor(private http: HttpClient) { }

  getRunningCategories() {
    this.http.get<{ message: string, categories: any }>(this.endPoint + "categories/running")
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
