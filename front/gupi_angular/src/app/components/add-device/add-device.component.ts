import {Component, EventEmitter, Output} from '@angular/core';
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
import {DeviceModel} from "../../model/device.model";
import {NzInputNumberComponent} from "ng-zorro-antd/input-number";

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
        NgForOf,
        NzInputNumberComponent
    ],
    templateUrl: './add-device.component.html',
    styleUrl: './add-device.component.css'
})
export class AddDeviceComponent {
    @Output() deviceAdded: EventEmitter<DeviceModel> = new EventEmitter<DeviceModel>();
    // numbers: number[];
    form: FormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        price: new FormControl('', [Validators.required]),
        category: new FormControl('', [Validators.required]),
        qr_code: new FormControl(''),
        possessor: new FormControl('')
    });

    constructor(private apiService: ApiService) {
        // numbers n'est plus utilisé pour le moment
        // this.numbers = Array.from({length: 250000}, (_, i) => i + 1);
    }

    submitDevice() {
        if (this.form.valid) {
            const formData: UserModel = this.form.value;
            console.log('Données du formulaire à envoyer :', formData);
            this.apiService.registerDevice(formData).subscribe(device => {
                // .emit permet d'envoyer l'évènement, ici on envoie l'objet "device"
                this.deviceAdded.emit(device);
                this.form.reset();
            });

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
