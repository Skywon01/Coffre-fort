import {Component, Input} from '@angular/core';
import {NzTableComponent, NzTdAddOnComponent, NzThMeasureDirective, NzTrExpandDirective} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {UserModel} from "../../model/user.model";
import {SingleEmployeeDisplayerComponent} from "../single-employee-displayer/single-employee-displayer.component";

@Component({
  selector: 'app-employee-list',
  standalone: true,
    imports: [
        NzTableComponent,
        NzThMeasureDirective,
        NgForOf,
        NzTdAddOnComponent,
        NzTrExpandDirective,
        SingleEmployeeDisplayerComponent
    ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
    @Input() tuyauDeUsers!: UserModel[]



}
