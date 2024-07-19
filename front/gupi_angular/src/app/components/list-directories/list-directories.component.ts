import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {DirectoryModel} from "../../model/directory.model";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {ListFileComponent} from "../list-file/list-file.component";
import {UploadComponent} from "../upload/upload.component";
import {AuthService} from "../../services/authentification/auth.service";
import {ApiService} from "../../services/api.service";
import {FormCreateDirectoryComponent} from "../form-create-directory/form-create-directory.component";
import {UploadFileComponent} from "../upload-file/upload-file.component";

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
        UploadComponent,
        NgIf,
        FormCreateDirectoryComponent,
        UploadFileComponent,
        NgTemplateOutlet
    ],
  templateUrl: './list-directories.component.html',
  styleUrl: './list-directories.component.css'
})
export class ListDirectoriesComponent implements OnInit {
    @Input() tuyauDeDirectory!: DirectoryModel[];
    openedDirectories: Map<number, boolean> = new Map();
    user_id: number | undefined;
    showCreateDirectoryForm: boolean = false;
    showCreateChildDirectoryForm: Map<number, boolean> = new Map();
    newChildDirectoryName: string = '';
    @Output() directoryAdded = new EventEmitter<DirectoryModel>();

    constructor(private authService: AuthService, private apiService: ApiService) {}

    toggleDirectory(directoryId: number) {
        if (this.openedDirectories.has(directoryId)) {
            this.openedDirectories.delete(directoryId);
        } else {
            this.openedDirectories.set(directoryId, true);
        }
    }

    toggleCreateChildDirectoryForm(directoryId: number) {
        if (this.showCreateChildDirectoryForm.has(directoryId)) {
            this.showCreateChildDirectoryForm.delete(directoryId);
        } else {
            this.showCreateChildDirectoryForm.set(directoryId, true);
        }
    }


    ngOnInit(): void {
        const user = this.authService.getUser();
        if (user) {
            this.user_id = user.id;
            this.loadUserDirectories(this.user_id);
        }
    }

    loadUserDirectories(userId: number | undefined): void {
        this.apiService.getUserParentDirectories(userId).subscribe(parentDirectories => {
            this.apiService.getUserChildDirectories(userId).subscribe(childDirectories => {
                this.tuyauDeDirectory = this.buildHierarchy(parentDirectories, childDirectories);
            });
        });
    }

    buildHierarchy(parents: DirectoryModel[], children: DirectoryModel[]): DirectoryModel[] {
        const directoryMap = new Map<number, DirectoryModel>();
        parents.forEach(directory => directoryMap.set(directory.id, directory));
        children.forEach(directory => directoryMap.set(directory.id, directory));

        children.forEach(directory => {
            if (directory.parent_id) {
                const parent = directoryMap.get(directory.parent_id);
                if (parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(directory);
                }
            }
        });

        return parents;
    }



    addDirectory(name: string): void {
        this.apiService.createDirectory(name).subscribe(newDirectory => {
            this.tuyauDeDirectory.push(newDirectory);
        });
    }

    addChildDirectory(parentId: number, name: string): void {
        this.apiService.createChildDirectory(parentId, name).subscribe(newChildDirectory => {
            const parentDirectory = this.tuyauDeDirectory.find(dir => dir.id === parentId);
            if (parentDirectory) {
                if (!parentDirectory.children) {
                    parentDirectory.children = [];
                }
                parentDirectory.children.push(newChildDirectory);
            }
            this.newChildDirectoryName = '';
            this.toggleCreateChildDirectoryForm(parentId);
            this.directoryAdded.emit(parentDirectory);
        });
    }

    isAuthorized(requiredRoles: string[]) {
        const userRoles = this.authService.getRoles();
        return requiredRoles.some(role => userRoles.includes(role));
    }

    loadDirectories() {
        const user = this.authService.getUser();
        this.apiService.getUserDirectories(user.id).subscribe((directories: DirectoryModel[]) => {
            this.tuyauDeDirectory = directories;
        });
    }

    onDirectoryCreated() {
        this.loadDirectories();
    }

    onFileUploaded() {
        if (this.openedDirectories.size > 0) {
            const listFilesComponent = document.querySelector('app-list-files') as any;
            if (listFilesComponent) {
                listFilesComponent.loadFiles();
            }
        }
    }
}
