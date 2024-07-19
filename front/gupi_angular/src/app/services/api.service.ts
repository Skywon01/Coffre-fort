import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DirectoryModel} from "../model/directory.model";
import {AuthService} from "./authentification/auth.service";

/**
 * Nom de domaine de l'api GUPI
 */
const apiRoot = "http://localhost:8080/api" //url de test dans un premier temps

/**
 * Ici on commence la communication Http
 */

const httpoptions = {
    header : new HttpHeaders( {
        'content-type': 'application/json',
        'Accept': 'text/html, application/xhtml+xml, */*'
    }),
    responseType: 'json' as 'json'
}

@Injectable(
    {
        providedIn: 'root',
    }
)
export class ApiService {
    //On ne renvoie que des observables ici grâce au back

    constructor(
        private http: HttpClient,
        private authService: AuthService,
    ) {  }

    private getAuthHeaders(): HttpHeaders {
        const token = this.authService.getUser();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
    }

    // Observables utilisateur
    retrieveAllUsers(): Observable<any> {
        return this.http.get(`${apiRoot}/users/`, httpoptions)
    }

    retrieveOneUser(id: string): Observable<any> {
        return  this.http.get(`${apiRoot}/user/${id}/`, httpoptions)
    }

    retrieveUserById(user_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/user/${user_id}/`, httpoptions);
    }

    registerUser(user: any): Observable<any> {
        return this.http.post(`${apiRoot}/users`, user, httpoptions)
    }

    // Observables Matériel
    retrieveAllDevices(): Observable<any> {
        return this.http.get(`${apiRoot}/device`, httpoptions)
    }

    retrieveOneDevice(id: string): Observable<any> {
        return  this.http.get(`${apiRoot}/device/${id}`, httpoptions)
    }

    retrieveDeviceById(device_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/device/${device_id}`, httpoptions);
    }

    registerDevice(device: any): Observable<any> {
        return this.http.post(`${apiRoot}/device`, device, httpoptions)
    }

    //Observables Dossiers

    retrieveAllDirectories(): Observable<any> {
        return this.http.get(`${apiRoot}/directories`, httpoptions)
    }

    retrieveOneDirectory(id: string): Observable<any> {
        return  this.http.get(`${apiRoot}/directories/${id}`, httpoptions)
    }

    retrieveDirectoryById(directory_id: number): Observable<any> {
        return this.http.get(`${apiRoot}/directories/${directory_id}/`, httpoptions);
    }

    registerDirectory(directory: any): Observable<any> {
        return this.http.post(`${apiRoot}/directories/`, directory, httpoptions)
    }

    getUserDirectories(user_id: number | undefined): Observable<DirectoryModel[]> {
        return this.http.get<DirectoryModel[]>(`${apiRoot}/directories/user/${user_id}`, { headers: this.getAuthHeaders() });
    }

    createDirectory(name: string): Observable<any> {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return this.http.post(`${apiRoot}/directories`, { name, user_id: user.id });
    }

    createChildDirectory(parent_id: number, name: string): Observable<DirectoryModel> {
        const url = `/api/directories/${parent_id}/children`;
        return this.http.post<DirectoryModel>(`${apiRoot}/directories/${parent_id}/children`, { name });
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
}


