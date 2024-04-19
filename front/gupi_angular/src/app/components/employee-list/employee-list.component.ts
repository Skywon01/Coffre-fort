import {Component, Input} from '@angular/core';
import {NzTableComponent, NzTdAddOnComponent, NzThMeasureDirective, NzTrExpandDirective} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {UserModel} from "../../model/user.model";
import {SingleEmployeeDisplayerComponent} from "../single-employee-displayer/single-employee-displayer.component";
import {NzMessageService} from "ng-zorro-antd/message";
import {NzUploadChangeParam, NzUploadComponent} from "ng-zorro-antd/upload";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-employee-list',
  standalone: true,
    imports: [
        NzTableComponent,
        NzThMeasureDirective,
        NgForOf,
        NzTdAddOnComponent,
        NzTrExpandDirective,
        SingleEmployeeDisplayerComponent,
        NzUploadComponent,
        NzIconDirective
    ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
    @Input() tuyauDeUsers!: UserModel[]
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
