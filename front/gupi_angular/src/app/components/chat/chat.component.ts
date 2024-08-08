import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
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

    constructor(
        private messageService: MessageService,
        private authService: AuthService,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.loadCurrentUser();
        this.loadUsersAndMessages();
    }

    loadCurrentUser(): void {
        const user = this.authService.getUser();
        if (user) {
            this.currentUser = user;
            console.log('Utilisateur courant:', this.currentUser); // Ajoutez cette ligne
        }
    }

    loadUsers(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    loadUsersAndMessages(): void {
        this.userService.getUsers().subscribe(users => {
            this.users = users;
            console.log('Utilisateurs chargés:', this.users); // Ajoutez cette ligne
            this.loadMessages();
        });
    }

    loadMessages(): void {
        if (this.currentUser && this.recipient) {
            this.messageService.getMessagesBetweenUsers(this.currentUser.id, this.recipient.id).subscribe(messages => {
                this.messages = messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

                this.messages.forEach(message => {
                    const senderId = message.senderId.id; // Accéder à l'ID à l'intérieur de l'objet
                    const recipientId = message.recipientId.id; // Accéder à l'ID à l'intérieur de l'objet

                    const sender = this.users.find(user => user.id === senderId);
                    const recipient = this.users.find(user => user.id === recipientId);

                    message.senderName = sender ? sender.name : 'Inconnu';
                    message.recipientName = recipient ? recipient.name : 'Inconnu';
                });
            });
        }
    }

    selectRecipient(user: UserModel): void {
        this.recipient = user;
        console.log('Destinataire sélectionné:', this.recipient); // Ajoutez cette ligne
        this.loadMessages();
    }

    sendMessage(): void {
        if (this.currentUser && this.recipient && this.newMessageContent.trim()) {
            const newMessage: MessageDTO = {
                id: null,
                content: this.newMessageContent,
                senderId: {id: this.currentUser.id}, // Créer un objet avec l'ID
                recipientId: {id: this.recipient.id}, // Créer un objet avec l'ID
                timestamp: new Date()
            };
            this.messageService.createMessage(newMessage).subscribe(message => {
                message.senderName = this.currentUser.name; // Associer le nom de l'expéditeur au nouveau message
                this.messages.push(message);
                this.messages = this.messages.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
                this.newMessageContent = '';
            });
        }
    }
}
