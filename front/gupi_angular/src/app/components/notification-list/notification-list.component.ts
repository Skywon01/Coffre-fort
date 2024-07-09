import { Component } from '@angular/core';
import {NzTableComponent} from "ng-zorro-antd/table";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {NgForOf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-notification-list',
  standalone: true,
    imports: [
        NzTableComponent,
        CdkDropList,
        NgForOf,
        CdkDrag,
        NzIconDirective
    ],
  templateUrl: './notification-list.component.html',
  styleUrl: './notification-list.component.css'
})
export class NotificationListComponent {
    listOfData = [
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
        }];
    drop(event: CdkDragDrop<string[]>): void {
        moveItemInArray(this.listOfData, event.previousIndex, event.currentIndex);
    }
}
