import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private endPoint = environment.endPoint;

  constructor(private http: HttpClient) { }

  getCreateAgentNoti() {
    return this.http.get(this.endPoint + '/notifications')
  }

  getNewNotification() {
    return this.http.get(this.endPoint + '/notifications/new')
  }

  readNotification() {
    return this.http.get(this.endPoint + '/notifications/read')
  }

  clearNotification() {
    return this.http.delete(this.endPoint + '/notifications')
  }
}
