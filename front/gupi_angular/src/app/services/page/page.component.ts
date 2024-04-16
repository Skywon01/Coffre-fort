import {Component, Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.css'
})
export class PageService {
    icon: string = '';
    title: string = '';
    text: string = '';

    setComponentType(icon: string, title: string, text: string) {
        this.icon = icon;
        this.title = title;
        this.text = text;
    }
}
