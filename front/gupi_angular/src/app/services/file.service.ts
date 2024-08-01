import {UserService} from "./user.service";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {AuthService} from "./authentification/auth.service";
import {apiRoot, ApiService} from "./api.service";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {FileModel} from "../model/file.model";

@Injectable({
    providedIn: 'root',
})
export class FileService {
    constructor(private http: HttpClient) {}



    getFilesByDirectoryId(directory_id: number): Observable<FileModel[]> {
        return this.http.get<FileModel[]>(`${apiRoot}/file/directory/${directory_id}`);
    }

    downloadFile(fileId: number): Observable<HttpResponse<Blob>> {
        return this.http.get(`${apiRoot}/file/download/${fileId}`, {
            responseType: 'blob',
            observe: 'response'
        });
    }

    deleteFile(id: number): Observable<void> {
        return this.http.delete<void>(`${apiRoot}/file/${id}`);
    }
}
