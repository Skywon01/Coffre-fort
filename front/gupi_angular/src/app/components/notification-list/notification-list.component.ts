import {Component, Input, OnInit} from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgForOf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {Usernotification, UsernotificationService} from "../../services/usernotification.service";

@Component({
  selector: 'app-notification-list',
  standalone: true,
    imports: [
        NzTableComponent,
        CdkDropList,
        NgForOf,
        CdkDrag,
        NzIconDirective,
        NzPopoverDirective
    ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent implements OnInit {
    @Input() userId!: number;
    @Input() senderName!: any;
    usernotification: Notification[] = [];

    constructor(private notificationService: UsernotificationService) {
    }

    ngOnInit() {
        this.loadNotifications();
    }

    loadNotifications() {
        this.notificationService.getNotifications(this.userId).subscribe(usernotifications => {
            this.usernotification = usernotifications;
        });
    }
}
