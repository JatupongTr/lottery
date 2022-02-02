
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
  private lists: List[] = [];
  private categories: Category[] = [
    {
      code: '2_digits_top',
      name: 'บน',
      description: '2 ตัวบน',
    },
    {
      code: '2_digits_down',
      name: 'ล่าง',
      description: '2 ตัวล่าง',
    },
    {
      code: 'running_top',
      name: 'บน',
      description: 'วิ่งบน',
    },
    {
      code: 'running_down',
      name: 'ล่าง',
      description: 'วิ่งล่าง',
    },
    {
      code: '3_numbers_top',
      name: 'บน',
      description: '3 ตัวบน',
    },
    {
      code: '3_numbers_todd',
      name: 'โต๊ด',
      description: '3 ตัวโต๊ด',
    },
    {
      code: '3_numbers_front',
      name: 'หน้า',
      description: '3 ตัวหน้า',
    },
    {
      code: '3_number_rear',
      name: 'ท้าย',
      description: '3 ตัวท้าย',
    },
    {
      code: '3_number_down',
      name: 'ล่าง',
      description: '3 ตัวล่าง',
    },
  ];

  constructor(private http: HttpClient) {}

  getCategoriesTwo() {
    return this.categories.slice(0, 2)
  }
  getCategoriesRunning() {
    return this.categories.slice(2, 4)
  }
  getCategoriesThree() {
    return this.categories.slice(4)
  }
  getLists() {
    return this.lists.slice();
  }

  addList(list: List) {
    this.lists.push(list);
    this.listsUpdated.next([...this.lists.slice()]);
  }

  addLists(lists: List[]) {
    this.lists.push(...lists)
    this.listsUpdated.next(this.lists.slice())
  }

  removeList(list: List) {
    const index: number = this.lists.indexOf(list);
    if (index !== -1) {
      this.lists.splice(index, 1);
    }
    this.listsUpdated.next(this.lists.slice());
  }
}
