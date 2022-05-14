import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ItemLimit } from '../settings/setting.model';
import { SettingsService } from '../settings/settings.service';
import { CategoriesService } from '../shared/categories.service';
import { Category } from '../shared/category.model';
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
    //test table edit
    private categoriesService: CategoriesService,
    private messageService: MessageService
  ) {}
  
  //rewardPrice table edit
  categories: Category[];

  clonedProducts: { [s: string]: Category; } = {};

  ngOnInit() {
    this.items = this.service.getItems()
    this.itemsUpdate = this.service.getItemUpdatedListner()
    .subscribe((items: ItemLimit[]) => {
      this.items = items;
    })
      
    //rewardPrice table edit
    this.categoriesService.getCategoriesNew()
    .then(data => this.categories = data);

  }

  onRowEditInit(product: Category) {
    this.clonedProducts[product.id] = {...product};
  }

  onRowEditSave(product: Category) {
    delete this.clonedProducts[product.id];
    this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
    this.categoriesService.putRewardPrice(product._id,product.rewardPrice).subscribe((res)=>{
    })
  }

  onRowEditCancel(product: Category, index: number) {
    this.categories[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
  }    



 /*  
  onSaveSettings(form: NgForm) {
    this.service.deleteLimitPrice().subscribe()

    this.service.postLimitNum(
        form.value.toddThreeDigits,
        form.value.topThreeDigits,
        form.value.downThreeDigits,
        form.value.firstThreeDigits,
        form.value.lastThreeDigits,
        form.value.topTwoDigits,
        form.value.downTwoDigits,
        form.value.topRunDigits,
        form.value.downRunDigits,
    ).subscribe((res)=>{
    })

    form.resetForm()
  } */

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

  onSaveRewardPrice(form: NgForm){
    let id = ""
    
    if(form.value.rewardPrice1) {
      id = "623966cadb01ff9ee525f1df"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice1,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice2) {
      id = "623966e2db01ff9ee525f1e1"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice2,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice3) {
      id = "623966f7db01ff9ee525f1e3"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice3,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice4) {
      id = "623966b9db01ff9ee525f1dd"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice4,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice5) {
      id = "62396709db01ff9ee525f1e5"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice5,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice6) {
      id = "62396645db01ff9ee525f1d5"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice6,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice7) {
      id = "62396654db01ff9ee525f1d7"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice7,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice8) {
      id = "6239666ddb01ff9ee525f1d9"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice8,
      ).subscribe((res)=>{
      });
    }

    if(form.value.rewardPrice9) {
      id = "6239667edb01ff9ee525f1db"
      this.categoriesService.putRewardPrice(
        id,
        form.value.rewardPrice9,
      ).subscribe((res)=>{
      });
    }
    
  }

}

