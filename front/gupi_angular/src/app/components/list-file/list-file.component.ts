import {Component, OnInit} from '@angular/core';
import {
    NzListComponent,
    NzListItemActionComponent,
    NzListItemComponent,
    NzListItemMetaComponent
} from "ng-zorro-antd/list";
import {NzSkeletonComponent} from "ng-zorro-antd/skeleton";
import {NzButtonComponent} from "ng-zorro-antd/button";
import {NzColDirective, NzRowDirective} from "ng-zorro-antd/grid";
import {TreeFileComponent} from "../tree-file/tree-file.component";
import {NzTableComponent, NzThMeasureDirective} from "ng-zorro-antd/table";
import {NgForOf, NgIf} from "@angular/common";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from "ng-zorro-antd/tree";
import {NzPopconfirmDirective} from "ng-zorro-antd/popconfirm";
import {FormsModule} from "@angular/forms";
import {NzInputDirective} from "ng-zorro-antd/input";

interface ItemData {
    id: string;
    name: string;
    age: string;
    address: string;
}


@Component({
  selector: 'app-list-file',
  standalone: true,
    imports: [
        NzListComponent,
        NzListItemComponent,
        NzSkeletonComponent,
        NzListItemMetaComponent,
        NzListItemActionComponent,
        NzButtonComponent,
        NzRowDirective,
        NzColDirective,
        TreeFileComponent,
        NzTableComponent,
        NgForOf,
        NzDividerComponent,
        NzFlexDirective,
        NgIf,
        NzDropdownMenuComponent,
        NzIconDirective,
        NzMenuDirective,
        NzMenuItemComponent,
        NzTreeComponent,
        NzPopconfirmDirective,
        FormsModule,
        NzInputDirective,
        NzThMeasureDirective
    ],
  templateUrl: './list-file.component.html',
  styleUrl: './list-file.component.css'
})
export class ListFileComponent implements OnInit{
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
