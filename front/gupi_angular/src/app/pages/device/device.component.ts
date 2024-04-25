import {Component, OnInit} from '@angular/core';
import {PageService} from "../../services/page/page.component";
import {DeviceListComponent} from "../../components/device-list/device-list.component";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DeviceService} from "../../services/device.service";
import {DeviceModel} from "../../model/device.model";

@Component({
    selector: 'app-device',
    standalone: true,
    imports: [
        DeviceListComponent
    ],
    templateUrl: './device.component.html',
    styleUrl: './device.component.css'
})
export class DeviceComponent implements OnInit {
    public devices: DeviceModel[] = []

    constructor(
        private pageService: PageService,
        private readonly deviceService: DeviceService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.pageService.setComponentType('mobile', 'Inventaire', 'Veuillez trouver l\'inventaire de votre matériel');
    }

    async ngOnInit() {
        //Récupère l'eventuel paramètre id dans l'url
        this.route.params.subscribe(params => {
            const id = params['id']
            if (!id) {
                this.vaChercherTousLesDevices()
            } else {
                this.vaChercherUnSeulDevice(id)
            }

        })
    }

    async vaChercherTousLesDevices(): Promise<void> {
        this.devices = await this.deviceService.getDeviceAll()
        console.log(this.devices)
    }

    async vaChercherUnSeulDevice(id: string) {
        this.devices = await this.deviceService.getDeviceOne(id)
        console.log(this.devices)
    }
}
