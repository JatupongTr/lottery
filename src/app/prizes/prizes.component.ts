import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PrizesService } from './prizes.service';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements OnInit {
  prizeForm: FormGroup;
  constructor(private prizesService: PrizesService) { }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    this.prizesService.addPrize(this.prizeForm.value)
    console.log(this.prizeForm.value)
    this.prizeForm.reset();
  }

  private initForm() {
    let daily = ''
    let first_prize = ''
    let three_last_prize = ''
    let three_first_prize = ''
    let two_down_prize = ''
    this.prizeForm = new FormGroup({
      daily: new FormControl(daily, Validators.required),
      first_prize: new FormControl(first_prize, Validators.required),
      three_last_prize: new FormControl(three_last_prize, Validators.required),
      three_first_prize: new FormControl(three_first_prize, Validators.required),
      two_down_prize: new FormControl(two_down_prize, Validators.required)
    })
  }
}
