import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {apiRoot, httpoptions} from "./api.service";
import {NotificationModel} from "../model/userNotification.model";
import {UserModel} from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class UsernotificationService {

    constructor(private http: HttpClient) {}

    getNotifications(userId: number): Observable<NotificationModel[]> {
        return this.http.get<NotificationModel[]>(`${apiRoot}/notifications/user/${userId}`);
    }

    getActiveNotificationsCount(userId: number): Observable<number> {
        return this.http.get<number>(`${apiRoot}/notifications/active/count/${userId}`);
    }

    markNotificationsAsInactive(userId: number): Observable<void> {
        return this.http.post<void>(`${apiRoot}/notifications/markAsInactive/${userId}`, {});
    }
}


