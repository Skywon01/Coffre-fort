import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/open'; // URL de ton backend

    constructor(private http: HttpClient) {}

    login(email: string | undefined, password: string | undefined): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, { email, password })
            .pipe(tap(response => {
                if (response && response.token) {
                    localStorage.setItem('jwtToken', response.token);
                }
            }));
    }

    getToken(): string | null {
        return localStorage.getItem('jwtToken');
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }
}
