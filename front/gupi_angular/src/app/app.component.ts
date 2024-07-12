import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {BreadcrumbComponent} from "./components/breadcrumb/breadcrumb.component";
import {UserIconComponent} from "./components/user-icon/user-icon.component";
import {NzColDirective} from "ng-zorro-antd/grid";
import {
    SingleEmployeeDisplayerComponent
} from "./components/single-employee-displayer/single-employee-displayer.component";
import {UserModel} from "./model/user.model";
import {UserService} from "./services/user.service";
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {ChatComponent} from "./components/chat/chat.component";
import {AuthService} from "./services/authentification/auth.service";
import {LoginComponent} from "./pages/login/login.component";


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, NzIconModule, NzLayoutModule, NzMenuModule, RouterLink, BreadcrumbComponent, UserIconComponent, NzColDirective, RouterLinkActive, SingleEmployeeDisplayerComponent, EmployeeListComponent, NzCardComponent, NzInputGroupComponent, NzInputDirective, NzFlexDirective, ChatComponent, LoginComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    isCollapsed = false;
    chatIsOpen = false;
    public users: UserModel[] = []

    constructor(
        private readonly userService: UserService,
        private route: ActivatedRoute,
        private router: Router,
        public authService: AuthService
    ) {
    }

    async ngOnInit() {
        //Récupère l'eventuel paramètre id dans l'url
        this.route.params.subscribe(params => {
            const id = params['id']
            if (!id) {
                this.vaChercherTousLesUsers()
            } else {
                this.vaChercherUnSeulUser(id)
            }

        })
    }

    async vaChercherTousLesUsers(): Promise<void> {
        this.users = await this.userService.getUserAll()
        console.log(this.users)
    }

    async vaChercherUnSeulUser(id: string) {
        this.users = await this.userService.getUserOne(id)
        console.log(this.users)
    }


}
