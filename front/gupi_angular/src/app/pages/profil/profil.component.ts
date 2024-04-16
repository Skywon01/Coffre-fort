import { Component } from '@angular/core';
import {NzButtonComponent, NzButtonShape, NzButtonSize} from "ng-zorro-antd/button";
import {NzQRCodeComponent} from "ng-zorro-antd/qr-code";
import {PageService} from "../../services/page/page.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzAlign, NzFlexDirective, NzJustify} from "ng-zorro-antd/flex";
import {DeviceListOwnedComponent} from "../../components/device-list-owned/device-list-owned.component";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";

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
        NzColDirective
    ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
shape: NzButtonShape = 'round'
    constructor(private pageService: PageService) {
        this.pageService.setComponentType('user', 'Mon profil', 'Veuillez trouver vos informations personnelles');
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
