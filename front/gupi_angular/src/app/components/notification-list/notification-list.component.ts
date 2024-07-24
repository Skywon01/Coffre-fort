import {Component, Input, OnInit} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {DatePipe, NgForOf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {UsernotificationService} from "../../services/usernotification.service";
import {NotificationModel} from "../../model/userNotification.model"
import {UserModel} from "../../model/user.model";

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
        DatePipe
    ],
    templateUrl: './notification-list.component.html',
    styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
    @Input() userId!: number; // Assure-toi que le userId est correctement passé en input
    public notifications: NotificationModel[] = [];

    constructor(private notificationService: UsernotificationService) {}

    ngOnInit() {
        this.loadNotifications();
    }

    loadNotifications() {
        if (this.userId) {
            this.notificationService.getNotifications(this.userId).subscribe(userNotifications => {
                this.notifications = userNotifications;
            }, error => {
                console.error('Error loading notifications:', error);
            });
        } else {
            console.error('userId is undefined');
        }
    }
}
