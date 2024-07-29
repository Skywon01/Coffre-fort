import {Component, Input, OnInit} from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {RouterLink} from "@angular/router";
import {NzBadgeComponent} from "ng-zorro-antd/badge";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";
import {UsernotificationService} from "../../services/usernotification.service";
import {UserService} from "../../services/user.service";
import {AuthService} from "../../services/authentification/auth.service";

@Component({
    selector: 'app-user-icon',
    standalone: true,
    imports: [
        NzIconDirective,
        NzButtonComponent,
        NzPopoverDirective,
        RouterLink,
        NzBadgeComponent,
        NzAvatarComponent
    ],
    templateUrl: './user-icon.component.html',
    styleUrl: './user-icon.component.css'
})
export class UserIconComponent implements OnInit{
    visible: boolean = false;
    activeCount: number = 0;
    @Input() userId!: number;

    constructor(private userNotificationService: UsernotificationService, private userService: UserService, private authService: AuthService) {}

    ngOnInit(): void {
        const user = this.authService.getUser();
        this.userId = user.id;
            this.loadActiveNotificationsCount();

    }

    loadActiveNotificationsCount(): void {
        if (this.userId !== undefined) {
            this.userNotificationService.getActiveNotificationsCount(this.userId).subscribe(count => {
                this.activeCount = count;
            }, error => {
                console.error('Error fetching active notifications count:', error);
            });
        }
    }

    clickMe(): void {
        this.visible = false;
    }

    change(value: boolean): void {
        console.log(value);
    }

    logout(): void {
        sessionStorage.removeItem('roles');
        sessionStorage.removeItem('user');
    }
}
