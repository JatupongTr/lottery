import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new Subject<User>();
  private token!: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(username: string, password: string) {
    const user: User = {
      username: username,
      password: password,
    };
    this.http
      .post<{ token: string }>('http://localhost:3000/api/users/login', user)
      .subscribe((response) => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
        }
        this.router.navigate(["/menu/overviews"])
      });
  }

  signup(username: string, password: string) {
    const user: User = {
      username: username,
      password: password
    }
    this.http.post("http://localhost:3000/api/users/signup", user)
      .subscribe(response => {
        console.log(response)
        window.location.reload();
      })
  }
}
