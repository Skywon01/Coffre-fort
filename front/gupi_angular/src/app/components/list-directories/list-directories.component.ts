import {Component, Input, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {DeviceModel} from "../../model/device.model";
import {DirectoryModel} from "../../model/directory.model";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {ListFileComponent} from "../list-file/list-file.component";
import {UploadComponent} from "../upload/upload.component";

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
        NzPopconfirmDirective,
        NzIconDirective,
        NzPopoverDirective,
        ListFileComponent,
        UploadComponent
    ],
  templateUrl: './list-directories.component.html',
  styleUrl: './list-directories.component.css'
})
export class ListDirectoriesComponent implements OnInit{
    @Input() tuyauDeDirectory!: DirectoryModel[];
    openedDirectoryId: number | null = null;

    toggleDirectory(directoryId: number) {
        if (this.openedDirectoryId === directoryId) {
            this.openedDirectoryId = null;
        } else {
            this.openedDirectoryId = directoryId;
        }
    }

    ngOnInit(): void {

    }
}
