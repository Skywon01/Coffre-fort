import {Component, Input, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {DeviceModel} from "../../model/device.model";
import {DirectoryModel} from "../../model/directory.model";

// interface ItemData {
//     id: string;
//     name: string;
//     age: string;
//     address: string;
// }

@Component({
  selector: 'app-list-directories',
  standalone: true,
    imports: [
        NzButtonComponent,
        NzTableComponent,
        NzThMeasureDirective,
        NgForOf,
        NzInputDirective,
        FormsModule,
        NzPopconfirmDirective
    ],
  templateUrl: './list-directories.component.html',
  styleUrl: './list-directories.component.css'
})
export class ListDirectoriesComponent implements OnInit{
    @Input() tuyauDeDirectory!: DirectoryModel[];

    ngOnInit(): void {

    }
}
