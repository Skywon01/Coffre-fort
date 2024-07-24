import {Injectable} from "@angular/core";
import {apiRoot, ApiService, httpoptions} from "./api.service";
import {lastValueFrom, Observable} from "rxjs";
import {UserModel} from "../model/user.model";
import {HttpClient} from "@angular/common/http";


@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private http: HttpClient,
    ) {
    }

    async getUserAll() {
        let res = await lastValueFrom(this.retrieveAllUsers())
        return this.formatData(res)
    }

    async getUserOne(id: string) {
        let res = await lastValueFrom(this.retrieveOneUser(id))
        return this.formatData([res])
    }

    formatData(rawdata: UserModel[]) {
        const temp: UserModel[] = []

        rawdata.map((el) => {
            let tempObj: UserModel = new UserModel(el.id, el.name, el.firstName, el.email, el.address, el.age, el.password, el.profile, el.directory, el.file, el.role)
            temp.push(tempObj);
        });
        // console.log('Data user: ', temp)
        return temp
    }

    retrieveAllUsers(): Observable<any> {
        return this.http.get(`${apiRoot}/users/`, httpoptions)
    }

    retrieveOneUser(id: string): Observable<any> {
        return this.http.get(`${apiRoot}/user/${id}/`, httpoptions)
    }

    retrieveUserById(user_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/user/${user_id}/`, httpoptions);
    }

    registerUser(user: any): Observable<any> {
        return this.http.post(`${apiRoot}/users`, user, httpoptions)
    }
    getCurrentUser(): Observable<UserModel> {
        return this.http.get<UserModel>(`${apiRoot}/users/current`, httpoptions);
    }

}

