import {Component} from '@angular/core';
import {PageService} from "../../services/page/page.component";
import {DeviceListComponent} from "../../components/device-list/device-list.component";

@Component({
    selector: 'app-device',
    standalone: true,
    imports: [
        DeviceListComponent
    ],
    templateUrl: './device.component.html',
    styleUrl: './device.component.css'
})
export class DeviceComponent {
    constructor(private pageService: PageService) {
        this.pageService.setComponentType('mobile', 'Inventaire', 'Veuillez trouver l\'inventaire de votre matériel');
    }
}
