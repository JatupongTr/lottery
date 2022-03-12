import { Subscription } from 'rxjs';
import { ListsService } from './../lists.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/shared/category.model';
import { List } from '../list.model';


@Component({
  selector: 'app-two-numbers',
  templateUrl: './two-numbers.component.html',
  styleUrls: ['./two-numbers.component.css'],
})
export class TwoNumbersComponent implements OnInit {
  @ViewChild('f', { static: false }) addListForm: NgForm;

  categories: Category[];
  private categorySub: Subscription;
  lists: List[];

  list_no = '';
  price: number = 0;
  discount: number = 0;
  netPrice: number = 0;

  constructor(public listsService: ListsService) {}

  ngOnInit(): void {
    this.listsService.getCategoriesTwo();
    this.categorySub = this.listsService.getCategoryUpdatedListener()
    .subscribe((categories: Category[]) => {
      this.categories = categories;

    })
  }
  onSaveList(form: NgForm) {
    const value = form.value;
    const total = value.price - (value.price * value.discount) / 100;
    this.netPrice = total;
    const newList = new List(
      value.list_no,
      value.price,
      value.discount,
      this.netPrice,
      value.categories
    )
    this.listsService.addList(newList);
    form.reset();
  }
}
