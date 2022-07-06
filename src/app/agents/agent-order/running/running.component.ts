import { ItemsService } from './../../../shared/items.service';
import { OrdersService } from 'src/app/shared/orders.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from 'src/app/shared/category.model';
import { RunningService } from 'src/app/shared/running.service';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.css'],
})
export class RunningComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) addListForm: NgForm;
  categories: Category[];
  items: Item[];


  private categorySub: Subscription;

  lottoNo = '';
  price: number = 0;
  discount: number = 0;
  netPrice: number = 0;

  constructor(
    private runningService: RunningService,
    private ordersService: OrdersService,
    private itemsService: ItemsService
  ) {}

  ngOnInit(): void {
    this.runningService.getRunningCategories();
    this.categorySub = this.runningService
      .getCategoryUpdatedListener()
      .subscribe((categories: any) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe()
  }

  onSaveList(form: NgForm) {
    const value = form.value;
    const total = value.price - (value.price * value.discount) / 100;
    this.netPrice = total;
    let categorySelect: Category;

    for (let categoryId of this.categories) {
      if (value.categories == categoryId.id) {
        categorySelect = categoryId;
      }
    }

    let newItems = new Item(
      value.lottoNo,
      value.price,
      value.discount,
      this.netPrice,
      value.categories
    )
    newItems.categoryName = categorySelect.cate_name
    this.itemsService.addItems(newItems)
    form.reset();
  }
}
