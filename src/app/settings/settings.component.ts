import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { CategoriesService } from '../shared/categories.service';
import { Category } from '../shared/category.model';
import {MessageService} from 'primeng-lts/api';

/* comment : add field ค่าเก็บ and field ยอดที่สามารถรับซื้อได้อีก คือ ยอดที่นำ ค่าเก็บ - ยอดรวม แต่ละประเภท  */

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  typeNumbers: string[] = [
    '3 ตัวโต๊ด',
    '3 ตัวบน',
    '3 ตัวล่าง',
    '3 ตัวหน้า',
    '3 ตัวท้าย',
    '2 ตัวบน',
    '2 ตัวล่าง',
    'วิ่งบน',
    'วิ่งล่าง',
  ];

  constructor(
    private service: SettingsService,
    //rewardPrice table edit
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}
    
  // table edit
  categories: Category[];

  clonedCategories: { [s: string]: Category; } = {};

  ngOnInit() {

    // table edit
    this.categoriesService.getCategoriesNew()
    .then(data => this.categories = data);

  }

  //rewardPrice table edit
  onRowInitRewardPrice(itemCate: Category) {
    this.clonedCategories[itemCate._id] = {...itemCate};
  }

  onRowSaveRewardPrice(itemCate: Category) {
    delete this.clonedCategories[itemCate._id];
    this.messageService.add({severity:'success', summary: 'Success', detail:'itemCate is updated'});
    this.categoriesService.putRewardPrice(itemCate._id,itemCate.rewardPrice).subscribe((res)=>{
    })
  }
  
  onRowEditRewardPrice(itemCate: Category, index: number) {
    this.categoriesService[index] = this.clonedCategories[itemCate._id];
    delete this.clonedCategories[itemCate._id];
  }   
  
  // PurchaseMaximum
  onRowSavePurchaseMaximum(itemCate: Category) {
    delete this.clonedCategories[itemCate._id];
    this.messageService.add({severity:'success', summary: 'Success', detail:'itemCate is updated'});
    this.categoriesService.putPurchaseMaximum(itemCate._id,itemCate.purchaseMaximum).subscribe((res)=>{
    })
  }
  
  // limit number

  onSaveNumber(form: NgForm) {

    if(form.value.typeNumber == '3 ตัวโต๊ด'){
      form.value.typeNumber = '623966cadb01ff9ee525f1df';
    };
    if(form.value.typeNumber == '3 ตัวบน'){
      form.value.typeNumber = '623966b9db01ff9ee525f1dd';
    };
    if(form.value.typeNumber == '3 ตัวล่าง'){
      form.value.typeNumber = '62396709db01ff9ee525f1e5';
    };
    if(form.value.typeNumber == '3 ตัวหน้า'){
      form.value.typeNumber = '623966e2db01ff9ee525f1e1';
    };
    if(form.value.typeNumber == '3 ตัวท้าย'){
      form.value.typeNumber = '623966f7db01ff9ee525f1e3';
    };
    if(form.value.typeNumber == '2 ตัวบน'){
      form.value.typeNumber = '62396645db01ff9ee525f1d5';
    };
    if(form.value.typeNumber == '2 ตัวล่าง'){
      form.value.typeNumber = '62396654db01ff9ee525f1d7';
    };
    if(form.value.typeNumber == 'วิ่งบน'){
      form.value.typeNumber = '6239666ddb01ff9ee525f1d9';
    };
    if(form.value.typeNumber == 'วิ่งล่าง'){
      form.value.typeNumber = '6239667edb01ff9ee525f1db';
    };

    /* const id = form.value.typeNumber */
    this.categoriesService.createHalfPay(
      form.value.typeNumber,
      form.value.rewardPrice,
      form.value.lottoNo,
      ).subscribe((res)=>{
      window.location.reload()
    })

  }

  onClear() {
    this.categoriesService.clearHalfPay().subscribe((res)=>{
      window.location.reload()
    });
  }

}

