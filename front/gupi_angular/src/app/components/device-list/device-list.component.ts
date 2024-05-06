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
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzMessageService} from "ng-zorro-antd/message";
import {ApiService} from "../../services/api.service";


interface ItemData {
    id: string;
    name: string;
    age: string;
    address: string;
}


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
export class DeviceListComponent implements OnInit{
    @Input() tuyauDeDevices!: DeviceModel[];
    show: boolean = false;
    constructor(private msg: NzMessageService) {}
    handleChange({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.msg.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.msg.error(`${file.name} file upload failed.`);
        }
    }

    ngOnInit(): void {
        // this.loadDevices();
    }

    // loadDevices() {
    //     this.tuyauDeDevices.subscribe(devices => {
    //         this.tuyauDeDevices = devices;
    //     });
    // }

    handleDeviceAdded(device: DeviceModel) {
        this.tuyauDeDevices.push(device); // Ajouter le nouveau périphérique à la liste existante
    }


}
