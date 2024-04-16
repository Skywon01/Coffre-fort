import { Component } from '@angular/core';
import {NzFormatEmitEvent, NzTreeComponent, NzTreeNode} from "ng-zorro-antd/tree";
import {LowerCasePipe, NgIf} from "@angular/common";
import {NzIconDirective} from "ng-zorro-antd/icon";
import {NzContextMenuService, NzDropdownMenuComponent} from "ng-zorro-antd/dropdown";
import {NzMenuDirective, NzMenuItemComponent} from "ng-zorro-antd/menu";
import {NzColDirective} from "ng-zorro-antd/grid";

@Component({
  selector: 'app-tree-file',
  standalone: true,
    imports: [
        NzTreeComponent,
        NgIf,
        NzIconDirective,
        NzDropdownMenuComponent,
        NzMenuDirective,
        NzMenuItemComponent,
        LowerCasePipe,
        NzColDirective
    ],
  templateUrl: './tree-file.component.html',
  styleUrl: './tree-file.component.css'
})
export class TreeFileComponent {
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
