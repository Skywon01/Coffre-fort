import {Component, OnInit} from '@angular/core';
import {NzButtonComponent, NzButtonShape, NzButtonSize} from "ng-zorro-antd/button";
import {NzQRCodeComponent} from "ng-zorro-antd/qr-code";
import {PageService} from "../../services/page/page.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzAlign, NzFlexDirective, NzJustify} from "ng-zorro-antd/flex";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {AuthService} from "../../services/authentification/auth.service";
import {NgIf} from "@angular/common";
import {DeviceListComponent} from "../../components/device-list/device-list.component";
import {DeviceModel} from "../../model/device.model";
import {DeviceService} from "../../services/device.service";
import {FormProfileEditComponent} from "../../components/form-profile-edit/form-profile-edit.component";


@Component({
    selector: 'app-profil',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzQRCodeComponent,
        NzIconDirective,
        NzFlexDirective,
        NzRowDirective,
        NzColDirective,
        NgIf,
        DeviceListComponent,
        FormProfileEditComponent
    ],
    templateUrl: './profil.component.html',
    styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit {
    user: any;
    devices: DeviceModel[] = [];
    shape: NzButtonShape = 'round'
    showUpdateProfile: boolean = false;

    constructor(private pageService: PageService, protected authService: AuthService, private deviceService: DeviceService,) {
        this.pageService.setComponentType('profile', 'Mon profil', 'Veuillez trouver vos informations personnelles');
    }

    ngOnInit(): void {
        this.user = this.authService.getUser();
        if (this.user) {
            this.loadUserDevices(this.user.id);
        }
    }

    onProfileUpdate() {
        this.authService.getUser();
    }
    loadUserDevices(userId: number): void {
        this.deviceService.getDevicesByUserId(userId).subscribe((devices: DeviceModel[]) => {
            this.devices = devices;
        });
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
