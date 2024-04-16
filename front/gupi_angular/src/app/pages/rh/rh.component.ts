import { Component } from '@angular/core';
import {AddUserFormComponent} from "../../components/add-user-form/add-user-form.component";
import {ModalRhComponent} from "../../components/modal-rh/modal-rh.component";
import {PageService} from "../../services/page/page.component";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {EmployeeListComponent} from "../../components/employee-list/employee-list.component";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
  selector: 'app-rh',
  standalone: true,
    imports: [
        AddUserFormComponent,
        ModalRhComponent,
        NzTabSetComponent,
        NzTabComponent,
        EmployeeListComponent,
        NzButtonComponent
    ],
  templateUrl: './rh.component.html',
  styleUrl: './rh.component.css'
})
export class RhComponent {
    constructor(private pageService: PageService) {
        this.pageService.setComponentType('assets/media/icons/icon_rh.svg', 'Accueil RH', 'Bienvenue sur la page RH');
    }

    show: boolean = false;
}
