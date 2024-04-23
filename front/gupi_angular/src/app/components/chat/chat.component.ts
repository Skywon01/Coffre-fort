import { Component } from '@angular/core';
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-chat',
  standalone: true,
    imports: [
        NzCardComponent,
        NzIconDirective
    ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
    currentDate = new Date();
    chatIsOpen = false;
}
