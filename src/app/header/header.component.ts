import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input("media_query") mobileQueryMax!: boolean;
  @Output() navToggle = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickNavToggle() {
    this.navToggle.emit();
  }
}
