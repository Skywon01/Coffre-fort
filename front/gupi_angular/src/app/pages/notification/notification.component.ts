import { Component } from '@angular/core';
import {PageService} from "../../services/page/page.component";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
    constructor(private pageService: PageService) {
        this.pageService.setComponentType('bell', 'Notifications', 'Veuillez trouver toutes vos notifications');
    }
}
