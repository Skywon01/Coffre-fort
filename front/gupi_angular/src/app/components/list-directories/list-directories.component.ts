import {Component, OnInit} from '@angular/core';
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf} from "@angular/common";
import {NzInputDirective} from "ng-zorro-antd/input";
import {FormsModule} from "@angular/forms";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";

interface ItemData {
    id: string;
    name: string;
    age: string;
    address: string;
}

@Component({
  selector: 'app-list-directories',
  standalone: true,
    imports: [
        NzButtonComponent,
        NzTableComponent,
        NzThMeasureDirective,
        NgForOf,
        NzInputDirective,
        FormsModule,
        NzPopconfirmDirective
    ],
  templateUrl: './list-directories.component.html',
  styleUrl: './list-directories.component.css'
})
export class ListDirectoriesComponent implements OnInit{
    i = 0;
    editId: string | null = null;
    listOfData: ItemData[] = [];

    startEdit(id: string): void {
        this.editId = id;
    }

    stopEdit(): void {
        this.editId = null;
    }

    addRow(): void {
        this.listOfData = [
            ...this.listOfData,
            {
                id: `${this.i}`,
                name: `Edward King ${this.i}`,
                age: '32',
                address: `London, Park Lane no. ${this.i}`
            }
        ];
        this.i++;
    }

    deleteRow(id: string): void {
        this.listOfData = this.listOfData.filter(d => d.id !== id);
    }

    ngOnInit(): void {
        this.addRow();
        this.addRow();
    }
}
