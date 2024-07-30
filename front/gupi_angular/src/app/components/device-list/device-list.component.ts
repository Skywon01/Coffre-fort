import {Component, Input, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {AddDeviceComponent} from "../add-device/add-device.component";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {DeviceModel} from "../../model/device.model";
import {NzUploadComponent} from "ng-zorro-antd/upload";



@Component({
    selector: 'app-device-list',
    standalone: true,
    imports: [
        NzButtonComponent,
        NzTableComponent,
        NzThMeasureDirective,
        NgForOf,
        NzInputDirective,
        FormsModule,
        NzPopconfirmDirective,
        AddDeviceComponent,
        NzIconDirective,
        NzUploadComponent,
        CurrencyPipe
    ],
    templateUrl: './device-list.component.html',
    styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit {
    @Input() tuyauDeDevices!: DeviceModel[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
