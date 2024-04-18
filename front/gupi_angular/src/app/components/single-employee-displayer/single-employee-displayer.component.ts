import { Component } from '@angular/core';
import {UserModel} from "../../model/user.model";
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {ApiService} from "../../services/api.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-single-employee-displayer',
  standalone: true,
    imports: [
        NgIf
    ],
  templateUrl: './single-employee-displayer.component.html',
  styleUrl: './single-employee-displayer.component.css'
})
export class SingleEmployeeDisplayerComponent {
    public users: UserModel[] = []
    user_id!: number;
    user: any;

    constructor(
        private readonly userService: UserService,
        private route: ActivatedRoute, private apiService: ApiService) { }

    ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.user_id = params['id'];
            this.loadUserDetails();
        });
    }

    loadUserDetails() {
        this.apiService.retrieveUserById(this.user_id).subscribe(
            (data) => {
                this.user = data;
            },
            (error) => {
                console.error('Erreur de récupération:', error);
            }
        );
    }
}
