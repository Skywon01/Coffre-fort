import {FileModel} from "./file.model";

export class DirectoryModel {
    // id: number;
    // name: string;
    // user_id: number | undefined;
    // parent_id: number | null;
    // children: DirectoryModel[];
    // files: FileModel[];
constructor(
    public id: number,
    public name: string,
    public user_id: number,
    public parent_id: number | null,
    public children: DirectoryModel[],
    public files?: FileModel[],
    public parents?: DirectoryModel[]
) {  }
}

