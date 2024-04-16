import { Component } from '@angular/core';
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
import {NzTableComponent} from "ng-zorro-antd/table";
import {NgForOf, NgIf} from "@angular/common";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NzFlexDirective} from "ng-zorro-antd/flex";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from "ng-zorro-antd/tree";

interface Person {
    key: string;
    name: string;
    age: number;
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
        NzTreeComponent
    ],
  templateUrl: './list-file.component.html',
  styleUrl: './list-file.component.css'
})
export class ListFileComponent {
    listOfData: Person[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park'
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park'
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park'
        }
    ];
    // activated node
    activatedNode?: NzTreeNode;
    nodes = [
        {
            title: 'parent 0',
            key: '100',
            author: 'NG ZORRO',
            expanded: true,
            children: [
                { title: 'leaf 0-0', key: '1000', author: 'NG ZORRO', isLeaf: true },
                { title: 'leaf 0-1', key: '1001', author: 'NG ZORRO', isLeaf: true }
            ]
        },
        {
            title: 'parent 1',
            key: '101',
            author: 'NG ZORRO',
            children: [
                { title: 'leaf 1-0', key: '1010', author: 'NG ZORRO', isLeaf: true },
                { title: 'leaf 1-1', key: '1011', author: 'NG ZORRO', isLeaf: true }
            ]
        }
    ];

    openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
        // do something if u want
        if (data instanceof NzTreeNode) {
            data.isExpanded = !data.isExpanded;
        } else {
            const node = data.node;
            if (node) {
                node.isExpanded = !node.isExpanded;
            }
        }
    }

    activeNode(data: NzFormatEmitEvent): void {
        this.activatedNode = data.node!;
    }

    contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
        this.nzContextMenuService.create($event, menu);
    }

    selectDropdown(): void {
        // do something
    }

    constructor(private nzContextMenuService: NzContextMenuService) {}

}
