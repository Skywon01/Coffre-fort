import {Component, EventEmitter, Output} from '@angular/core';
import {
    FormControl,
    FormGroup, FormsModule,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {
    NzFormControlComponent,
    NzFormDirective,
    NzFormItemComponent,
    NzFormLabelComponent
} from "ng-zorro-antd/form";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NgForOf} from "@angular/common";
import {UserModel} from "../../model/user.model";
import {ApiService} from "../../services/api.service";
import {NzIconDirective} from "ng-zorro-antd/icon";

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
        NgForOf,
        NzIconDirective,
        FormsModule
    ],
    templateUrl: './add-user-form.component.html',
    styleUrl: './add-user-form.component.css'
})
export class AddUserFormComponent {
    @Output() userAdded: EventEmitter<UserModel> = new EventEmitter<UserModel>();
    passwordVisible = false;
    password?: string;
    numbers: number[];
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        address: new FormControl(''),
        age: new FormControl(''),
        password: new FormControl('', [Validators.required]),
        role_id: new FormControl(''),
    });

    constructor(private apiService: ApiService) {
        this.numbers = Array.from({length: 99}, (_, i) => i + 1);
    }

    onSubmit() {
        if (this.form.valid) {
            const formData: UserModel = this.form.value;
            console.log('Données du formulaire à envoyer :', formData);
            this.apiService.registerUser(formData).subscribe(user => {

                    this.userAdded.emit(user);
                }
            )
            this.form.reset();

        } else {
            Object.values(this.form.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({onlySelf: true});
                }
            });

        }
    }
}
