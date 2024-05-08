import {Component} from '@angular/core';
import {FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzButtonComponent} from "ng-zorro-antd/button";

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NzFormItemComponent,
        NzFormControlComponent,
        NzInputGroupComponent,
        NzInputDirective,
        NzRowDirective,
        NzColDirective,
        NzCheckboxComponent,
        NzButtonComponent,
        NzFormDirective
    ],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
    validateForm: FormGroup<{
        userName: FormControl<string>;
        password: FormControl<string>;
        remember: FormControl<boolean>;
    }> = this.fb.group({
        userName: ['', [Validators.required]],
        password: ['', [Validators.required]],
        remember: [true]
    });

    constructor(private fb: NonNullableFormBuilder) {
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            console.log('submit', this.validateForm.value);
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });
        }
    }
}
