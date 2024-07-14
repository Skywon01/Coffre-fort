import { Component } from '@angular/core';
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {RouterLink} from "@angular/router";
import {NzBadgeComponent} from "ng-zorro-antd/badge";
import {NzAvatarComponent} from "ng-zorro-antd/avatar";

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
export class UserIconComponent {
  visible: boolean = false;

  clickMe(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }

    logout(): void {
        localStorage.removeItem('jwtToken');
    }
}
