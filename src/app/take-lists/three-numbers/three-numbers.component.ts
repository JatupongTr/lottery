import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/shared/category.model';
import { List } from '../list.model';
import { ListsService } from '../lists.service';

@Component({
  selector: 'app-three-numbers',
  templateUrl: './three-numbers.component.html',
  styleUrls: ['./three-numbers.component.css']
})
export class ThreeNumbersComponent implements OnInit {

  @ViewChild('f', { static: false }) addListForm: NgForm;
  categories: Category[];
  lists: List[];

  list_no = '';
  price: number = 0;
  discount: number = 0;
  netPrice: number = 0;

  constructor(public listsService: ListsService) { }

  ngOnInit(): void {
    this.categories = this.listsService.getCategoriesThree()
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
