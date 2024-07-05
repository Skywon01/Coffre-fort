import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

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
        private http: HttpClient
    ) {  }
    // Observables utilisateur
    retrieveAllUsers(): Observable<any> {
        return this.http.get(`${apiRoot}/user`, httpoptions)
    }

    retrieveOneUser(id: string): Observable<any> {
        return  this.http.get(`${apiRoot}/user/${id}`, httpoptions)
    }

    retrieveUserById(userId: number): Observable<any> {
        return this.http.get(`${apiRoot}/user/${userId}`, httpoptions);
    }

    registerUser(user: any): Observable<any> {
        return this.http.post(`${apiRoot}/user`, user, httpoptions)
    }

    // Observables Matériel
    retrieveAllDevices(): Observable<any> {
        return this.http.get(`${apiRoot}/device`, httpoptions)
    }

    retrieveOneDevice(id: string): Observable<any> {
        return  this.http.get(`${apiRoot}/device/${id}`, httpoptions)
    }

    retrieveDeviceById(userId: number): Observable<any> {
        return this.http.get(`${apiRoot}/device/${userId}`, httpoptions);
    }

    registerDevice(user: any): Observable<any> {
        return this.http.post(`${apiRoot}/device`, user, httpoptions)
    }

    //Observables Dossiers

    retrieveAllDirectories(): Observable<any> {
        return this.http.get(`${apiRoot}/folders/folderall`, httpoptions)
    }

    retrieveOneDirectory(id: string): Observable<any> {
        return  this.http.get(`${apiRoot}/directory/${id}`, httpoptions)
    }

    retrieveDirectoryById(userId: number): Observable<any> {
        return this.http.get(`${apiRoot}/directory/${userId}`, httpoptions);
    }

    registerDirectory(user: any): Observable<any> {
        return this.http.post(`${apiRoot}/directory`, user, httpoptions)
    }


}
