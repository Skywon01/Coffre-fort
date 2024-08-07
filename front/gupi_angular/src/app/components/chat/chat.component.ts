import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { MessageService } from '../../services/message.service';
import {UserModel} from "../../model/user.model";
import {AuthService} from "../../services/authentification/auth.service";
import {UserService} from "../../services/user.service";
import {MessageDTO} from "../../model/message.model";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";


@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    standalone: true,
    imports: [
        NzIconDirective,
        DatePipe,
        FormsModule,
        NgForOf,
        NgClass,
        NgIf,
        NzSelectComponent,
        NzOptionComponent
    ],
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    messages: MessageDTO[] = [];
    newMessageContent: string = '';
    currentUser!: UserModel;
    recipient!: UserModel;
    users: UserModel[] = [];
    chatIsOpen: boolean = false;
    @ViewChild('messagesContainer') private messagesContainer!: ElementRef;

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.loadCurrentUser();
        this.loadUsers();
    }

    loadCurrentUser(): void {
        const user = this.authService.getUser();
        if (user) {
            this.currentUser = user;
        }
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    loadMessages(): void {
        if (this.currentUser && this.recipient) {
            this.messageService.getMessagesBetweenUsers(this.currentUser.id, this.recipient.id).subscribe(messages => {
                this.messages = messages;
                this.scrollToBottom();
            });
        }
    }

    selectRecipient(user: UserModel): void {
        this.recipient = user;
        this.loadMessages();
    }

    sendMessage(): void {
        if (this.currentUser && this.recipient && this.newMessageContent.trim()) {
            const newMessage: MessageDTO = {
                id: null,
                content: this.newMessageContent,
                senderId: this.currentUser.id,
                recipientId: this.recipient.id,
                timestamp: new Date()
            };
            this.messageService.createMessage(newMessage).subscribe(message => {
                this.messages.push(message);
                this.newMessageContent = '';
            });
        }
    }

    scrollToBottom(): void {
        try {
            this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
        } catch (err) { }
    }
}
