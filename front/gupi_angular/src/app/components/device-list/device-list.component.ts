import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {AddDeviceComponent} from "../add-device/add-device.component";
import {NzIconDirective} from "ng-zorro-antd/icon";

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
        NzIconDirective
    ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent implements OnInit{
    i = 0;
    editId: string | null = null;
    listOfData: ItemData[] = [];
    show: boolean = false;

    startEdit(id: string): void {
        this.editId = id;
    }

    stopEdit(): void {
        this.editId = null;
    }

    addRow(): void {

        this.listOfData = [
            ...this.listOfData,
            {
                id: `${this.i}`,
                name: `Edward King ${this.i}`,
                age: '32',
                address: `London, Park Lane no. ${this.i}`
            }
        ];
        this.i++;
    }

    deleteRow(id: string): void {
        this.listOfData = this.listOfData.filter(d => d.id !== id);
    }

    ngOnInit(): void {
        this.addRow();
        this.addRow();
    }
}
