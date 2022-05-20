import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SettingsService } from '../settings/settings.service';
import { ItemLimit } from '../settings/setting.model';
import { CategoriesService } from '../shared/categories.service';
import { Category } from '../shared/category.model';
import { LimitNumber } from '../settings/limitNumber.model';
import {MessageService} from 'primeng-lts/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {

  favoriteType: string;
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

  items: ItemLimit[];
  itemsUpdate: Subscription;

  constructor(
    private service: SettingsService,
    //rewardPrice table edit
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}
    
  //rewardPrice table edit
  categories: Category[];
  
  //limitNumber table edit
  limitNumbers: LimitNumber[];

  clonedCategories: { [s: string]: Category; } = {};

  ngOnInit() {
    this.items = this.service.getItems()
    this.itemsUpdate = this.service.getItemUpdatedListner()
    .subscribe((items: ItemLimit[]) => {
      this.items = items;
    })
          
    //rewardPrice table edit
    this.categoriesService.getCategoriesNew()
    .then(data => this.categories = data);
    
    //limitNumber
    this.service.getLimitNumber()
    .then(data => this.limitNumbers = data);

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

  onSubmit(form: NgForm) {
    this.service.deleteLimitNumber().subscribe()

    this.service.createLimitNumber(this.items).subscribe((res)=>{
      window.location.reload()
      })

  }

  onSaveNumber(form: NgForm) {
    const item = new ItemLimit(
      form.value.limitNumber,
      form.value.typeNumber,
    )

    this.service.addItems(item)    

    form.resetForm()
  }

  onRemove(item: ItemLimit) {
    this.service.removeItems(item);
  }

}

