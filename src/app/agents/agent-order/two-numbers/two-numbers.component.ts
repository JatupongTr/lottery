import { Item } from './../../../shared/item.model';
import { ItemsService } from './../../../shared/items.service';
import { CategoriesService } from '../../../shared/categories.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Category } from 'src/app/shared/category.model';

@Component({
  selector: 'app-two-numbers',
  templateUrl: './two-numbers.component.html',
  styleUrls: ['./two-numbers.component.css'],
})
export class TwoNumbersComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) addListForm: NgForm;

  private categorySub: Subscription;
  items: Item[]

  categories: Category[];
  lottoNo = '';
  price: number = 0;
  discount: number = 0;
  netPrice: number = 0;

  constructor(private cateService: CategoriesService, private itemsService: ItemsService) {}

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
    this.netPrice = total;

    // let categorySelect: Category;

    // for (let categoryId of this.categories) {
    //   if (value.categories === categoryId.id) {
    //     categorySelect = categoryId;
    //   }
    // }
    const newItems = new Item(
      value.lottoNo,
      value.price,
      value.discount,
      this.netPrice,
      // categorySelect,
      value.categories
    )
    this.itemsService.addItems(newItems)
    form.reset();
  }
}
