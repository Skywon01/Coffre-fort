import { Component } from '@angular/core';
import {NzMessageService} from "ng-zorro-antd/message";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {ListFileComponent} from "../list-file/list-file.component";

@Component({
  selector: 'app-upload',
  standalone: true,
    imports: [
        NzUploadComponent,
        NzIconDirective,
        ListFileComponent
    ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.css'
})
export class UploadComponent {
    constructor(private msg: NzMessageService) {}

    handleChange({ file, fileList }: NzUploadChangeParam): void {
        const status = file.status;
        if (status !== 'uploading') {
            console.log(file, fileList);
        }
        if (status === 'done') {
            this.msg.success(`${file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            this.msg.error(`${file.name} file upload failed.`);
        }
    }
}
