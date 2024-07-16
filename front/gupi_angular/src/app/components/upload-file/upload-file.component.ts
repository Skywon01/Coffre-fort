import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {DirectoryService} from "../../services/directory.service";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-upload-file',
  standalone: true,
    imports: [
        FormsModule
    ],
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.css'
})
export class UploadFileComponent {
    @Input() directoryId!: number;
    @Output() fileUploaded = new EventEmitter<void>();
    selectedFile!: File;
    constructor(private apiService: ApiService) {}

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    onSubmit() {
        if (this.selectedFile) {
            this.apiService.uploadFile(this.selectedFile, this.directoryId).subscribe(response => {
                console.log('File uploaded:', response);
                this.fileUploaded.emit();
            }, error => {
                console.error('Error uploading file:', error);
            });
        }
    }
}
