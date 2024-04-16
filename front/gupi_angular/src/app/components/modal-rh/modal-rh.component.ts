import { Component } from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzModalComponent, NzModalContentDirective} from "ng-zorro-antd/modal";

@Component({
  selector: 'app-modal-rh',
  standalone: true,
  imports: [
    NzButtonComponent,
    NzModalComponent,
    NzModalContentDirective
  ],
  templateUrl: './modal-rh.component.html',
  styleUrl: './modal-rh.component.css'
})
export class ModalRhComponent {
    isVisible = false;

    constructor() {}

    showModal(): void {
        this.isVisible = true;
    }

    handleOk(): void {
        console.log('Button ok clicked!');
        this.isVisible = false;
    }

    handleCancel(): void {
        console.log('Button cancel clicked!');
        this.isVisible = false;
    }
}
