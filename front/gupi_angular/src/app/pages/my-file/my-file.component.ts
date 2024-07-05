import { Component } from '@angular/core';
import {PageService} from "../../services/page/page.component";
import {ListFileComponent} from "../../components/list-file/list-file.component";
import {ListDirectoriesComponent} from "../../components/list-directories/list-directories.component";

@Component({
  selector: 'app-my-file',
  standalone: true,
    imports: [
        ListFileComponent,
        ListDirectoriesComponent
    ],
  templateUrl: './my-file.component.html',
  styleUrl: './my-file.component.css'
})
export class MyFileComponent {
    constructor(private pageService: PageService) {
        this.pageService.setComponentType('folder-open', 'Mes dossiers', 'Veuillez trouver l\'ensemble de vos dossiers');
    }
}
