import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {lastValueFrom} from "rxjs";
import {} from "../model/user.model";
import {DirectoryModel} from "../model/directory.model";



@Injectable({
    providedIn: 'root',
})
export class DirectoryService{
    constructor(
        private apiService: ApiService
    ) {}
    async getDirectoryAll() {
        let res = await lastValueFrom(this.apiService.retrieveAllDirectories())
        return this.formatData(res)
    }

    async getDirectoryOne(id: string) {
        let res = await lastValueFrom(this.apiService.retrieveOneDirectory(id))
        return this.formatData([res])
    }

    formatData(rawdata: DirectoryModel[]) {
        const temp: DirectoryModel[] = []

        rawdata.map((el) =>{
            let tempObj: DirectoryModel = new DirectoryModel(el.id, el.name, el.user_id, el.parent_id, el.children)
            temp.push(tempObj);
        })
        console.log('Data directory: ', temp)
        return temp
    }








}

