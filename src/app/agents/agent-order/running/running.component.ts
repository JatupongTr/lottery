import { OrdersService } from 'src/app/shared/orders.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from 'src/app/shared/category.model';
import { ListsService } from '../../../take-lists/lists.service';
import { Lotto } from 'src/app/shared/lotto.model';
import { RunningService } from 'src/app/shared/running.service';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.css'],
})
export class RunningComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) addListForm: NgForm;
  categories: Category[];
  items: Lotto[];

  private categorySub: Subscription;

  lotto_no = '';
  price: number = 0;
  discount: number = 0;
  net_price: number = 0;

  constructor(
    private runningService: RunningService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.runningService.getRunningCategories();
    this.categorySub = this.runningService
      .getCategoryUpdatedListener()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe()
  }

  onSaveList(form: NgForm) {
    const value = form.value;
    const total = value.price - (value.price * value.discount) / 100;
    this.net_price = total;
    let categorySelect: Category;

    for (let category of this.categories) {
      if (value.categories == category.id) {
        categorySelect = category;
      }
    }

    const newItem = new Lotto(
      value.lotto_no,
      value.price,
      value.discount,
      this.net_price,
      categorySelect
    );
    this.ordersService.addItems(newItem);
    form.reset();
  }
}
