import { OrdersService } from 'src/app/shared/orders.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/category.model';
import { ListsService } from '../../../take-lists/lists.service';
import { Lotto } from 'src/app/shared/lotto.model';

@Component({
  selector: 'app-three-numbers',
  templateUrl: './three-numbers.component.html',
  styleUrls: ['./three-numbers.component.css']
})
export class ThreeNumbersComponent implements OnInit {

  @ViewChild('f', { static: false }) addListForm: NgForm;
  categories: Category[];
  private categorySub: Subscription;
  items: Lotto[]

  lotto_no = '';
  price: number = 0;
  discount: number = 0;
  net_price: number = 0;

  constructor(public listsService: ListsService, private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.listsService.getCategoriesThree()
    this.categorySub = this.listsService.getCategoryUpdatedListener()
    .subscribe((categories: Category[]) => {
      this.categories = categories;

    })
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
    )
    this.ordersService.addItems(newItem)
    form.reset();
  }
}