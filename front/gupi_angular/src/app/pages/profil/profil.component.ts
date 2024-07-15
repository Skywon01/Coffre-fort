import {Component, OnInit} from '@angular/core';
import {NzButtonComponent, NzButtonShape, NzButtonSize} from "ng-zorro-antd/button";
import {NzQRCodeComponent} from "ng-zorro-antd/qr-code";
import {PageService} from "../../services/page/page.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzAlign, NzFlexDirective, NzJustify} from "ng-zorro-antd/flex";
import {DeviceListOwnedComponent} from "../../components/device-list-owned/device-list-owned.component";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {AuthService} from "../../services/authentification/auth.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
    selector: 'app-profil',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzQRCodeComponent,
        NzIconDirective,
        NzFlexDirective,
        DeviceListOwnedComponent,
        NzRowDirective,
        NzColDirective,
        NgIf
    ],
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
    user: any;
    shape: NzButtonShape = 'round'

    constructor(private pageService: PageService, protected authService: AuthService) {
        this.pageService.setComponentType('profile', 'Mon profil', 'Veuillez trouver vos informations personnelles');
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        // console.log('User:', this.user);
    }


    public justifySegment: NzJustify[] = [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly'
    ];
    public alignSegment: NzAlign[] = ['flex-start', 'center', 'flex-end'];
    public selectedJustification = 0;
    public selectedLAlignment = 0;
}
