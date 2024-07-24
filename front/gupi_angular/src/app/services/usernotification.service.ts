import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {apiRoot} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class UsernotificationService {

    constructor(private http: HttpClient) {}

    getNotifications(userId: number): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${apiRoot}/notifications/user/${userId}`);
    }
}

export interface Usernotification {
    id: number;
    senderName: string;
    fileName: string;
    timestamp: string;
    user: {
        id: number;
    };
}
