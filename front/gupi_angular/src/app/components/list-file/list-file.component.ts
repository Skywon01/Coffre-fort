import {Component, Input, OnInit} from '@angular/core';
import {
    NzListComponent,
    NzListItemActionComponent,
    NzListItemComponent,
    NzListItemMetaComponent
} from "ng-zorro-antd/list";
import {NzSkeletonComponent} from "ng-zorro-antd/skeleton";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf, NgIf} from "@angular/common";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from "ng-zorro-antd/tree";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";
import {DirectoryService} from "../../services/directory.service";
import {ApiService} from "../../services/api.service";


@Component({
    selector: 'app-list-file',
    standalone: true,
    imports: [
        NzListComponent,
        NzListItemComponent,
        NzSkeletonComponent,
        NzListItemMetaComponent,
        NzListItemActionComponent,
        NzButtonComponent,
        NzRowDirective,
        NzColDirective,
        NzTableComponent,
        NgForOf,
        NzDividerComponent,
        NzFlexDirective,
        NgIf,
        NzDropdownMenuComponent,
        NzIconDirective,
        NzMenuDirective,
        NzMenuItemComponent,
        NzTreeComponent,
        NzPopconfirmDirective,
        FormsModule,
        NzInputDirective,
        NzThMeasureDirective
    ],
    templateUrl: './list-file.component.html',
    styleUrl: './list-file.component.css'
})
export class ListFileComponent implements OnInit {
    @Input() directoryId!: number;
    files: any[] = [];

    constructor(private directoryService: DirectoryService,) {
    }

    ngOnInit() {
        this.loadFiles();
    }

    loadFiles() {
        this.directoryService.getFilesByDirectoryId(this.directoryId).subscribe(files => {
            this.files = files;
        }, error => {
            console.error('Error loading files:', error);
        });
    }

    download(fileId: number): void {
        this.directoryService.downloadFile(fileId).subscribe(response => {
            if (response.body) {
                const blob = new Blob([response.body], {type: response.headers.get('Content-Type') || 'application/octet-stream'});
                const contentDisposition = response.headers.get('Content-Disposition');
                const fileName = this.getFileNameFromContentDisposition(contentDisposition);

                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                a.remove();
            } else {
                console.error('No file content found in response.');
            }
        });
    }


    private getFileNameFromContentDisposition(contentDisposition: string | null): string {
        if (!contentDisposition) {
            return 'downloaded-file';
        }

        const startIndex = contentDisposition.indexOf('filename="');
        if (startIndex === -1) {
            return 'downloaded-file';
        }

        const endIndex = contentDisposition.indexOf('"', startIndex + 10); // +10 pour sauter "filename="
        if (endIndex === -1) {
            return 'downloaded-file';
        }

        const fileName = contentDisposition.substring(startIndex + 10, endIndex);
        return fileName.trim();
    }

}
