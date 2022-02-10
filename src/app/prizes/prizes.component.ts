import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prizes',
  templateUrl: './prizes.component.html',
  styleUrls: ['./prizes.component.css']
})
export class PrizesComponent implements OnInit {
  prizeForm: FormControl;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {}

}
