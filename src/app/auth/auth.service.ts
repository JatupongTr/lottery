import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private endPoint = environment.endPoint;
  user = new Subject<User>();
  private token: string;
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
      .post<{token: string, fetchedUser: any} >(this.endPoint + '/users/login', user)
      .subscribe((res) => {
        const token = res.token;
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData(token);
          sessionStorage.setItem("username", res.fetchedUser.username)
          this.router.navigate(["/menu/overviews"])
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  signup(username: string, password: string) {
    const user: User = {
      username: username,
      password: password
    }
    this.http.post(this.endPoint + "/users/signup", user)
      .subscribe(response => {
        console.log(response)
      }, error => {
        this.authStatusListener.next(false)
      })
  }
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token
    this.isAuthenticated =true
    this.authStatusListener.next(true)
  }
  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token)
  }
  private clearAuthData() {
    localStorage.removeItem("token")
  }
  private getAuthData() {
    const token = localStorage.getItem("token")
    if (!token) {
      return;
    }
    return {
      token: token
    }
  }
}
