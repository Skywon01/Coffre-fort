import {Component, Input, OnInit} from '@angular/core';
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
    openedDirectoryId: number = -1;
    user_id: number | undefined;
    showCreateDirectoryForm: boolean = false;

    constructor(private authService: AuthService, private apiService: ApiService) {}

    toggleDirectory(directoryId: number) {
        if (this.openedDirectoryId === directoryId) {
            this.openedDirectoryId = -1; // Réinitialiser à -1 pour indiquer qu'aucun répertoire n'est ouvert
        } else {
            this.openedDirectoryId = directoryId;
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
        this.apiService.getUserDirectories(userId).subscribe(directories => {
            this.tuyauDeDirectory = this.buildHierarchy(directories);
        });
    }

    buildHierarchy(directories: DirectoryModel[]): DirectoryModel[] {
        const directoryMap = new Map<number, DirectoryModel>();
        directories.forEach(directory => directoryMap.set(directory.id, directory));
        const rootDirectories: DirectoryModel[] = [];

        directories.forEach(directory => {
            if (directory.parent_id) {
                const parent = directoryMap.get(directory.parent_id);
                if (parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(directory);
                }
            } else {
                rootDirectories.push(directory);
            }
        });

        console.log("Root Directories: ", rootDirectories); // Log the hierarchy
        return rootDirectories;
    }


    addDirectory(name: string): void {
        this.apiService.createDirectory(name).subscribe(newDirectory => {
            this.tuyauDeDirectory.push(newDirectory);
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
        if (this.openedDirectoryId) {
            const listFilesComponent = document.querySelector('app-list-files') as any;
            if (listFilesComponent) {
                listFilesComponent.loadFiles();
            }
        }
    }
}
