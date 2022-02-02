import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy{

  mobileQueryMax!: MediaQueryList;

  private _mobileQueryListener!: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryMax = media.matchMedia('(max-width: 750px)');
    this.mobileQueryMax.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mobileQueryMax.removeListener(this._mobileQueryListener)
}

}
