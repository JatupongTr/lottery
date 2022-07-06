import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input('media_query') mobileQueryMax!: boolean;
  @Output() navToggle = new EventEmitter();

  private authListenerSubs: Subscription;
  userIsAuthenticated = false
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onLogout() {
    this.authService.logout();
    this.isLoading = true;

    this.router.navigate(['/auth'])
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  onClickNavToggle() {
    this.navToggle.emit();
  }
}
