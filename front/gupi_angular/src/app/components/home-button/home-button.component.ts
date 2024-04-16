import { Component } from '@angular/core';
import {NzRowDirective} from "ng-zorro-antd/grid";
import {NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home-button',
  standalone: true,
  imports: [
    NzRowDirective,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './home-button.component.html',
  styleUrl: './home-button.component.css'
})
export class HomeButtonComponent {

}
