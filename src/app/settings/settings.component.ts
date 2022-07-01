import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { CategoriesService } from '../shared/categories.service';
import { Category } from '../shared/category.model';
import { MessageService } from 'primeng-lts/api';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HalfPay, HalfPayResponse } from '../shared/halfPayResponse.model';

/* comment : add field ค่าเก็บ and field ยอดที่สามารถรับซื้อได้อีก คือ ยอดที่นำ ค่าเก็บ - ยอดรวม แต่ละประเภท  */

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor(
    private service: SettingsService,
    //rewardPrice table edit
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}

  // table edit
  categories: Category[];
  selectCategory: string;
  halfPaySub: Subscription;
  halfPay: HalfPayResponse[];
  halfPayId: string;
  categoryId: string;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'category', 'lottoNo', 'action'];
  dataSource = new MatTableDataSource<HalfPayResponse>();
  clonedCategories: { [s: string]: Category } = {};

  ngOnInit() {
    this.categoriesService.getCategories();

    this.dataSource.paginator = this.paginator;
    this.categoriesService.getHalfPay().subscribe((res: HalfPayResponse[]) => {
      this.dataSource.data = res;
    });
    // table edit
    this.categoriesService
      .getCategoriesNew()
      .then((data) => (this.categories = data));
  }

  //rewardPrice table edit
  onRowInitRewardPrice(itemCate: Category) {
    this.clonedCategories[itemCate._id] = { ...itemCate };
  }

  onRowSaveRewardPrice(itemCate: Category) {
    delete this.clonedCategories[itemCate._id];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'itemCate is updated',
    });
    this.categoriesService
      .putRewardPrice(
        itemCate._id,
        itemCate.rewardPrice,
        itemCate.halfPayReward
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  onRowEditRewardPrice(itemCate: Category, index: number) {
    this.categoriesService[index] = this.clonedCategories[itemCate._id];
    delete this.clonedCategories[itemCate._id];
  }

  // PurchaseMaximum
  onRowSavePurchaseMaximum(itemCate: Category) {
    delete this.clonedCategories[itemCate._id];
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'itemCate is updated',
    });
    this.categoriesService
      .putPurchaseMaximum(itemCate._id, itemCate.purchaseMaximum)
      .subscribe((res) => {});
  }

  // limit number

  onSaveNumber(form: NgForm) {
    this.categoriesService
      .createHalfPay(form.value.id, form.value.lottoNo)
      .subscribe((res) => {
        window.location.reload();
      });
  }

  onClear() {
    if (confirm('ล้างข้อมูล')) {
      this.categoriesService.clearHalfPay().subscribe((res) => {
        window.location.reload();
      });
    }
  }

  onReset() {
    if (confirm('ล้างข้อมูล')) {
      this.categoriesService.resetSetting().subscribe((res) => {
        window.location.reload();
      });
    }
  }

  onRemoveHalfPay(categoryId: string, halfPayId: any) {
    this.categoriesService
      .removeHalfpay(categoryId, halfPayId)
      .subscribe((res) => {
        console.log('deleted');
        window.location.reload();
      });
  }
}
