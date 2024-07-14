import { Component } from '@angular/core';
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {NzAlign, NzFlexDirective, NzJustify} from "ng-zorro-antd/flex";
import {NzIconDirective} from "ng-zorro-antd/icon";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        LoginFormComponent,
        NzFlexDirective,
        NzIconDirective
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
    isVertical = true;

    public justifySegment: NzJustify[] = [
        'flex-start',
        'center',
        'flex-end',
        'space-between',
        'space-around',
        'space-evenly'
    ];
    public alignSegment: NzAlign[] = ['flex-start', 'center', 'flex-end'];
    public selectedJustification = 0;
    public selectedLAlignment = 0;


}
