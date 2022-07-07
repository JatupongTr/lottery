import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: any = null;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    sessionStorage.clear();
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false
      }
    )
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authService.login(form.value.username, form.value.password)
    } else {
      this.authService.signup(form.value.username, form.value.password)
    }
    form.resetForm();
  }

  ngOnDestroy(): void {
      this.authStatusSub.unsubscribe()
  }
}
