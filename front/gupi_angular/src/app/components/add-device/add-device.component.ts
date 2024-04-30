import {Component} from '@angular/core';
import {
    FormControl,
    FormGroup,
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
import {ApiService} from "../../services/api.service";
import {UserModel} from "../../model/user.model";
import {NgForOf} from "@angular/common";

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
        NzCheckboxComponent,
        NgForOf
    ],
    templateUrl: './add-device.component.html',
    styleUrl: './add-device.component.css'
})
export class AddDeviceComponent {
    numbers: number[];
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        qr_code: new FormControl(''),
        possessor: new FormControl('')
    });

    constructor(private apiService: ApiService) {
        this.numbers = Array.from({length: 9999}, (_, i) => i + 1);
    }

    submitDevice() {
        if (this.form.valid) {
            const formData: UserModel = this.form.value;
            console.log('Données du formulaire à envoyer :', formData);
            this.apiService.registerDevice(formData).subscribe()

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
