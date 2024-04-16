import { Component } from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzDividerComponent} from "ng-zorro-antd/divider";

interface Person {
    key: string;
    name: string;
    age: number;
    address: string;
}

@Component({
  selector: 'app-device-list-owned',
  standalone: true,
    imports: [
        NzTableComponent,
        NgForOf,
        NzDividerComponent
    ],
  templateUrl: './device-list-owned.component.html',
  styleUrl: './device-list-owned.component.css'
})
export class DeviceListOwnedComponent {
    listOfData: Person[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];
}
