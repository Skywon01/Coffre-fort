import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    ValidatorFn,
    Validators
} from "@angular/forms";
import {
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent,
    NzFormTooltipIcon
} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";

@Component({
  selector: 'app-add-device',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        NzFormDirective,
        NzFormItemComponent,
        NzFormLabelComponent,
        NzColDirective,
        NzFormControlComponent,
        NzInputDirective,
        NzInputGroupComponent,
        NzSelectComponent,
        NzOptionComponent,
        NzRowDirective,
        NzButtonComponent,
        NzCheckboxComponent
    ],
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.css'
})
export class AddDeviceComponent {
    validateForm: FormGroup<{
        email: FormControl<string>;
        password: FormControl<string>;
        checkPassword: FormControl<string>;
        nickname: FormControl<string>;
        phoneNumberPrefix: FormControl<'+86' | '+87'>;
        phoneNumber: FormControl<string>;
        website: FormControl<string>;
        captcha: FormControl<string>;
        agree: FormControl<boolean>;
    }>;
    captchaTooltipIcon: NzFormTooltipIcon = {
        type: 'info-circle',
        theme: 'twotone'
    };

    submitForm(): void {
        if (this.validateForm.valid) {
            console.log('submit', this.validateForm.value);
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }



    confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls.password.value) {
            return { confirm: true, error: true };
        }
        return {};
    };

    getCaptcha(e: MouseEvent): void {
        e.preventDefault();
    }

    constructor(private fb: NonNullableFormBuilder) {
        this.validateForm = this.fb.group({
            email: ['', [Validators.email, Validators.required]],
            password: ['', [Validators.required]],
            checkPassword: ['', [Validators.required, this.confirmationValidator]],
            nickname: ['', [Validators.required]],
            phoneNumberPrefix: '+86' as '+86' | '+87',
            phoneNumber: ['', [Validators.required]],
            website: ['', [Validators.required]],
            captcha: ['', [Validators.required]],
            agree: [false]
        });
    }
}
