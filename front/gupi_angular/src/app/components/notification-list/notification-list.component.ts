import {Component, Input, OnInit} from '@angular/core';
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {CurrencyPipe, DatePipe, NgForOf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {UsernotificationService} from "../../services/usernotification.service";
import {NotificationModel} from "../../model/userNotification.model"
import {UserModel} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/authentification/auth.service";

@Component({
    selector: 'app-notification-list',
    standalone: true,
    imports: [
        NzTableComponent,
        CdkDropList,
        NgForOf,
        CdkDrag,
        NzIconDirective,
        NzPopoverDirective,
        DatePipe,
        CurrencyPipe,
        NzThMeasureDirective
    ],
    templateUrl: './notification-list.component.html',
    styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
    @Input() userId!: number;
    public notifications: NotificationModel[] = [];


    constructor(private userNotificationService: UsernotificationService, private userService: UserService, private authService: AuthService) {}

    ngOnInit() {
        const user = this.authService.getUser();
        if (user) {
            this.userId = user.id;
            this.loadNotifications();
            this.markNotificationsAsInactive()
        }
    }

    markNotificationsAsInactive(): void {
        if (this.userId !== undefined) {
            this.userNotificationService.markNotificationsAsInactive(this.userId).subscribe(() => {
                console.log('Notifications marked as inactive');
            }, error => {
                console.error('Error marking notifications as inactive:', error);
            });
        }}

    loadNotifications() {
        if (this.userId) {
            this.userNotificationService.getNotifications(this.userId).subscribe(userNotifications => {
                this.notifications = userNotifications;
            }, error => {
                console.error('Error loading notifications:', error);
            });
        } else {
            console.error('userId is undefined');
        }
    }
}
