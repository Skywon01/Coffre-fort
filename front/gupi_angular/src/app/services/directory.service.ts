import {Injectable} from "@angular/core";
import {apiRoot, ApiService, httpoptions} from "./api.service";
import {lastValueFrom, Observable} from "rxjs";
import {} from "../model/user.model";
import {DirectoryModel} from "../model/directory.model";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {UserService} from "./user.service";
import {AuthService} from "./authentification/auth.service";


@Injectable({
    providedIn: 'root',
})
export class DirectoryService {
    constructor(
        private userService: UserService,
        private http: HttpClient,
        private authService: AuthService,
        private apiService: ApiService
    ) {
    }

    async getDirectoryAll() {
        let res = await lastValueFrom(this.retrieveAllDirectories())
        return this.formatData(res)
    }

    async getDirectoryOne(id: string) {
        let res = await lastValueFrom(this.retrieveOneDirectory(id))
        return this.formatData([res])
    }

    formatData(rawdata: DirectoryModel[]) {
        const temp: DirectoryModel[] = []

        rawdata.map((el) => {
            let tempObj: DirectoryModel = new DirectoryModel(el.id, el.name, el.user_id, el.parent_id, el.children)
            temp.push(tempObj);
        })
        // console.log('Data directory: ', temp)
        return temp
    }

    retrieveAllDirectories(): Observable<any> {
        return this.http.get(`${apiRoot}/directories`, httpoptions)
    }

    retrieveOneDirectory(id: string): Observable<any> {
        return this.http.get(`${apiRoot}/directories/${id}`, httpoptions)
    }

    retrieveDirectoryById(directory_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/directories/${directory_id}/`, httpoptions);
    }

    registerDirectory(directory: any): Observable<any> {
        return this.http.post(`${apiRoot}/directories/`, directory, httpoptions)
    }

    getUserDirectories(user_id: number | undefined): Observable<DirectoryModel[]> {
        return this.http.get<DirectoryModel[]>(`${apiRoot}/directories/user/${user_id}`, {headers: this.apiService.getAuthHeaders()});
    }

    createDirectory(name: { user_id: number; name: string }): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.post(`${apiRoot}/directories`, {name, user_id: user.id});
    }

    createChildDirectory(parent_id: number, name: string): Observable<DirectoryModel> {
        const url = `/api/directories/${parent_id}/children`;
        return this.http.post<DirectoryModel>(`${apiRoot}/directories/${parent_id}/children`, {name});
    }

    uploadFile(file: File, directoryId: number): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('directoryId', directoryId.toString());
        return this.http.post<any>(`${apiRoot}/file/upload`, formData);
    }

    getFilesByDirectoryId(directory_id: number): Observable<any> {
        return this.http.get<any>(`${apiRoot}/file/directory/${directory_id}`);
    }

    downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
        return this.http.get(`${apiRoot}/file/download/${fileId}`, {
            responseType: 'blob',
            observe: 'response'
        });
    }

    getUserParentDirectories(user_id: number | undefined): Observable<DirectoryModel[]> {
        return this.http.get<DirectoryModel[]>(`${apiRoot}/directories/user/${user_id}/parents`);
    }

    getUserChildDirectories(user_id: number | undefined): Observable<DirectoryModel[]> {
        return this.http.get<DirectoryModel[]>(`${apiRoot}/directories/user/${user_id}/children`);
    }



    uploadFileToUserFolder(file: File, user_id: number, senderName: string, senderFirstName: string): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('userId', user_id.toString());
        formData.append('senderName', senderName);
        formData.append('senderFirstName', senderFirstName);

        return this.http.post(`${apiRoot}/file/upload-to-user-folder/${user_id}`, formData, {responseType: 'text'});
    }

}
