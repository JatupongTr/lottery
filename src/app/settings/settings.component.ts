
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Setting, ItemLimit } from '../settings/setting.model';
import { SettingsService } from '../settings/settings.service';

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
  selectNumbersType: string;
  itemsService: any;

  constructor(
    private service: SettingsService
  ) {}
  
  ngOnInit(): void {
    this.items = this.service.getItems()
    this.itemsUpdate = this.service.getItemUpdatedListner()
    .subscribe((items: ItemLimit[]) => {
      this.items = items;
    })
  }

  onSelect(select: string) {
    this.selectNumbersType = select;
    console.log(this.selectNumbersType)
  }
  
  onSaveSettings(form: NgForm) {
    this.service.deleteSettings().subscribe()

    this.service.createKeepPrice(
        form.value.toddThree,
        form.value.topThree,
        form.value.downThree,
        form.value.firstThree,
        form.value.lastThree,
        form.value.topTwo,
        form.value.downTwo,
        form.value.topRunning,
        form.value.downRunning,
    ).subscribe((res)=>{
    })

    form.resetForm()
  }

  // change name aunn = limit

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

