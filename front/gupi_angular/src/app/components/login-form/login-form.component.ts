import {Component} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    NonNullableFormBuilder,
    ReactiveFormsModule,
    Validators
} from "@angular/forms";
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent, NzFormLabelComponent} from "ng-zorro-antd/form";
import {NzInputDirective, NzInputGroupComponent} from "ng-zorro-antd/input";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {NzCheckboxComponent} from "ng-zorro-antd/checkbox";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {AuthService} from "../../services/authentification/auth.service";
import {Router} from "@angular/router";

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
        NzFormDirective,
        NzFormLabelComponent
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

    constructor(private fb: NonNullableFormBuilder, private authService: AuthService, private router: Router) {
    }

    submitForm(): void {
        if (this.validateForm.valid) {
            const { userName, password, remember } = this.validateForm.value;
            this.authService.login(userName, password).subscribe({
                next: (response) => {
                    console.log('Login successful', response);
                    this.router.navigate(['/welcome']); // Redirige vers une route protégée après connexion
                },
                error: (error) => {
                    console.error('Login failed', error);
                    // Gérer les erreurs de connexion (afficher un message à l'utilisateur, etc.)
                }
            });
        } else {
            Object.values(this.validateForm.controls).forEach(control => {
                if (control.invalid) {
                    control.markAsDirty();
                    control.updateValueAndValidity({ onlySelf: true });
                }
            });
        }
    }
}
