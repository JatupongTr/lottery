
import { OrdersService } from './../../../shared/orders.service';
import { CategoriesService } from '../../../shared/categories.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/category.model';
import { Lotto } from 'src/app/shared/lotto.model';

@Component({
  selector: 'app-two-numbers',
  templateUrl: './two-numbers.component.html',
  styleUrls: ['./two-numbers.component.css'],
})
export class TwoNumbersComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) addListForm: NgForm;

  categories: Category[];
  private categorySub: Subscription;
  items: Lotto[]

  lotto_no = '';
  price: number = 0;
  discount: number = 0;
  net_price: number = 0;

  constructor(private cateService: CategoriesService, private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.cateService.getCategoriesTwo()
    this.categorySub = this.cateService.getCategoryUpdatedListener()
      .subscribe((categories: Category[]) => {
        this.categories = categories
      })
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
  }

  onSaveList(form: NgForm) {
    const value = form.value;
    const total = value.price - (value.price * value.discount) / 100;
    this.net_price = total;
    const newItems = new Lotto(
      value.lotto_no,
      value.price,
      value.discount,
      this.net_price,
      value.categories
    )
    this.ordersService.addItems(newItems)
    console.log(newItems)
    form.reset();
  }
}
