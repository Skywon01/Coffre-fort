import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {interval, Observable, switchMap} from 'rxjs';
import {MessageDTO} from "../model/message.model";
import {apiRoot, httpoptions} from "./api.service";

@Injectable({
    providedIn: 'root'
})
export class MessageService {


    constructor(private http: HttpClient) {}

    getMessages(): Observable<MessageDTO[]> {
        return this.http.get<MessageDTO[]>(apiRoot);
    }

    getMessagesForUser(userId: number): Observable<MessageDTO[]> {
        return this.http.get<MessageDTO[]>(`${apiRoot}/messages/user/${userId}`, httpoptions);
    }

    createMessage(message: MessageDTO): Observable<MessageDTO> {
        return this.http.post<MessageDTO>(`${apiRoot}/messages`, message, httpoptions);
    }

    getMessagesBetweenUsers(senderId: number, recipientId: number): Observable<MessageDTO[]> {
        return this.http.get<MessageDTO[]>(`${apiRoot}/messages/conversation/${senderId}/${recipientId}`, httpoptions);
    }

    pollMessages(senderId: number, recipientId: number): Observable<MessageDTO[]> {
        return interval(5000).pipe( // Interroger toutes les 5 secondes
            switchMap(() => this.getMessagesBetweenUsers(senderId, recipientId))
        );
    }

}
