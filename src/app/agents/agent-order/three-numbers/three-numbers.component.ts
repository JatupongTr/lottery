import { ItemsService } from './../../../shared/items.service';
import { CategoriesService } from './../../../shared/categories.service';
import { OrdersService } from 'src/app/shared/orders.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/category.model';
import { Item } from 'src/app/shared/item.model';

@Component({
  selector: 'app-three-numbers',
  templateUrl: './three-numbers.component.html',
  styleUrls: ['./three-numbers.component.css']
})
export class ThreeNumbersComponent implements OnInit {

  @ViewChild('f', { static: false }) addListForm: NgForm;
  categories: Category[];
  private categorySub: Subscription;
  items: Item[]

  lottoNo = '';
  price: number = 0;
  discount: number = 0;
  netPrice: number = 0;

  constructor(private ordersService: OrdersService, private categoriesService: CategoriesService, private itemsService: ItemsService) { }

  ngOnInit(): void {
    this.categoriesService.getCategoriesThree()
    this.categorySub = this.categoriesService.getCategoryUpdatedListener()
    .subscribe((categories: Category[]) => {
      this.categories = categories;

    })
  }
  onSaveList(form: NgForm) {
    const value = form.value;
    const total = value.price - (value.price * value.discount) / 100;
    this.netPrice = total;
    let categorySelect: Category;

    for (let categoryId of this.categories) {
      if (value.categories == categoryId.id) {
        categorySelect = categoryId
      }
    }

    const newItem = new Item(
      value.lottoNo,
      value.price,
      value.discount,
      this.netPrice,
      categorySelect
    )
    this.itemsService.addItems(newItem)
    form.reset();
  }
}
