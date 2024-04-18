import { Component } from '@angular/core';
import {AddUserFormComponent} from "../../components/add-user-form/add-user-form.component";
import {ModalRhComponent} from "../../components/modal-rh/modal-rh.component";
import {PageService} from "../../services/page/page.component";
import {NzTabComponent, NzTabSetComponent} from "ng-zorro-antd/tabs";
import {EmployeeListComponent} from "../../components/employee-list/employee-list.component";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../model/user.model";

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
    public users: UserModel[] = []
    constructor(private pageService: PageService,
    private readonly userService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
        this.pageService.setComponentType('assets/media/icons/icon_rh.svg', 'Accueil RH', 'Bienvenue sur la page RH');

    }
    async vaChercherTousLesUsers(): Promise<void> {
        this.users = await this.userService.getUserAll()
        console.log(this.users)
    }


    show: boolean = false;
}
