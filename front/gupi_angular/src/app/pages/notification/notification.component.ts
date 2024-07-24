import {Component, Input, OnInit} from '@angular/core';
import {PageService} from "../../services/page/page.component";
import {NotificationListComponent} from "../../components/notification-list/notification-list.component";
import {UserService} from "../../services/user.service";

import {UserModel} from "../../model/user.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
    imports: [
        NotificationListComponent,
        NgIf
    ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{
    public currentUserId!: number;
    constructor(private pageService: PageService, private userService: UserService,) {
        this.pageService.setComponentType('bell', 'Notifications', 'Veuillez trouver toutes vos notifications');

    }

    ngOnInit(): void {
        this.userService.getCurrentUser().subscribe(
            (user: UserModel) => {
                this.currentUserId = user.id;
                console.log('Current user ID:', this.currentUserId);
            },
            error => {
                console.error('Error fetching current user:', error);
            }
        );
    }
}
