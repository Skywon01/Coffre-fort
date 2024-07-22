import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {DirectoryModel} from "../model/directory.model";
import {AuthService} from "./authentification/auth.service";

/**
 * Nom de domaine de l'api GUPI
 */
export const apiRoot = "http://localhost:8080/api" //url de test dans un premier temps

/**
 * Ici on commence la communication Http
 */

export const httpoptions = {
    header: new HttpHeaders({
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
    ) {
    }

    public getAuthHeaders(): HttpHeaders {
        const token = this.authService.getUser();
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
    }


}


