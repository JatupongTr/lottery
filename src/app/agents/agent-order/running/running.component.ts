import { OrdersService } from 'src/app/shared/orders.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Category } from 'src/app/shared/category.model';
import { ListsService } from '../../../take-lists/lists.service';
import { Lotto } from 'src/app/shared/lotto.model';

@Component({
  selector: 'app-running',
  templateUrl: './running.component.html',
  styleUrls: ['./running.component.css'],
})
export class RunningComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) addListForm: NgForm;
  categories: Category[];
  items: Lotto[]

  private categorySub: Subscription;

  lotto_no = '';
  price: number = 0;
  discount: number = 0;
  net_price: number = 0;

  constructor(private listsService: ListsService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.listsService.getCategoriesRunning();
    this.categorySub = this.listsService
      .getCategoryUpdatedListener()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  onSaveList(form: NgForm) {
    const value = form.value;
    const total = value.price - (value.price * value.discount) / 100;
    this.net_price = total;
    const newItem = new Lotto(
      value.lotto_no,
      value.price,
      value.discount,
      this.net_price,
      value.categories
    );
    this.ordersService.addItems(newItem)
    form.reset();
  }
}
