import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NzMessageService} from "ng-zorro-antd/message";
import {DirectoryService} from "../../services/directory.service";

@Component({
  selector: 'app-upload-file-user',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './upload-file-user.component.html',
  styleUrl: './upload-file-user.component.css'
})
export class UploadFileUserComponent {

    @Input() userId!: number;
    @Output() fileUploaded = new EventEmitter<void>();
    selectedFile!: File;

    constructor(private directoryService: DirectoryService, private msg: NzMessageService) {}

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        if (this.selectedFile) {
            this.directoryService.uploadFileToUserFolder(this.selectedFile, this.userId).subscribe(response => {
                console.log('File uploaded:', response);
                this.msg.success('Fichier téléchargé avec succès.');
                this.fileUploaded.emit();
            }, error => {
                console.error('Error uploading file:', error);
                this.msg.error('Erreur lors du téléchargement du fichier.');
            });
        }
    }
}
