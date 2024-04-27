import {Component} from '@angular/core';
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
import {of} from "rxjs";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-add-user-form',
    standalone: true,
    imports: [
        NzFormDirective,
        ReactiveFormsModule,
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
        NzCheckboxComponent,
        NgForOf
    ],
    templateUrl: './add-user-form.component.html',
    styleUrl: './add-user-form.component.css'
})
export class AddUserFormComponent {
    numbers: number[];
    validateForm: FormGroup<{
        user_id: FormControl<string>;
        name: FormControl<string>;
        firstName: FormControl<string>;
        email: FormControl<string>;
        age: FormControl<string>;
        address: FormControl<string>;



    }>;


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


    constructor(private fb: NonNullableFormBuilder) {
        this.validateForm = this.fb.group({
            user_id: [''],
            name: ['', [Validators.required]],
            firstName: ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            age: ['', Validators.min(18)],
            address: ['', [Validators.required]],

        });
        this.numbers = Array.from({length: 99}, (_, i) => i + 1);
    }


}
