import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgClass, NgForOf, NgIf, NgStyle, NgTemplateOutlet} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {DirectoryModel} from "../../model/directory.model";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzPopoverDirective} from "ng-zorro-antd/popover";
import {ListFileComponent} from "../list-file/list-file.component";
import {AuthService} from "../../services/authentification/auth.service";
import {ApiService} from "../../services/api.service";
import {FormCreateDirectoryComponent} from "../form-create-directory/form-create-directory.component";
import {UploadFileComponent} from "../upload-file/upload-file.component";
import {DirectoryService} from "../../services/directory.service";
import {NzMessageService} from "ng-zorro-antd/message";

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
        NgIf,
        FormCreateDirectoryComponent,
        UploadFileComponent,
        NgTemplateOutlet,
        NgStyle,
        NgClass
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

    constructor(private authService: AuthService, private directoryService: DirectoryService, protected apiService: ApiService, private message: NzMessageService) {
    }

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
        this.directoryService.getUserParentDirectories(userId).subscribe(parentDirectories => {
            this.directoryService.getUserChildDirectories(userId).subscribe(childDirectories => {
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



    addChildDirectory(parentId: number, name: string): void {
        this.directoryService.createChildDirectory(parentId, name).subscribe(newChildDirectory => {
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



    loadDirectories() {
        const user = this.authService.getUser();
        this.directoryService.getUserParentDirectories(user.id).subscribe((directories: DirectoryModel[]) => {
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

    deleteDirectory(id: number): void {
        this.directoryService.deleteDirectory(id).subscribe(
            () => {
                this.message.success('Répertoire supprimé avec succès');
                // Logique pour mettre à jour la liste des répertoires localement
                this.tuyauDeDirectory = this.tuyauDeDirectory.filter(dir => dir.id !== id);
            },
            error => {
                this.message.error(error.error.message || 'Erreur lors de la suppression du répertoire');
            }
        );
    }
    isEven(index: number): boolean {
        return index % 2 === 0;
    }
}
