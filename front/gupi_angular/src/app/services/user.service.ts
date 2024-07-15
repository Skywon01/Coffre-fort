import {Injectable} from "@angular/core";
import {ApiService} from "./api.service";
import {lastValueFrom} from "rxjs";
import {UserModel} from "../model/user.model";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private apiService: ApiService
    ) {
    }

    async getUserAll() {
        let res = await lastValueFrom(this.apiService.retrieveAllUsers())
        return this.formatData(res)
    }

    async getUserOne(id: string) {
        let res = await lastValueFrom(this.apiService.retrieveOneUser(id))
        return this.formatData([res])
    }

    formatData(rawdata: UserModel[]) {
        const temp: UserModel[] = []

        rawdata.map((el) => {
            let tempObj: UserModel = new UserModel(el.id, el.name, el.firstName, el.email, el.address, el.age, el.password, el.directory, el.file, el.role)
            temp.push(tempObj);
        })
        console.log('Data user: ', temp)
        return temp
    }


}

