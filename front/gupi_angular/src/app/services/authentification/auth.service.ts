import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = 'http://localhost:8080/api/open'; // URL de ton backend

    constructor(private http: HttpClient) {
    }

    login(email: string | undefined, password: string | undefined): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/login`, {email, password}, {withCredentials: true})
            .pipe(tap(response => {
                if (response) {
                    sessionStorage.setItem('user', JSON.stringify(response.user));
                    sessionStorage.setItem('roles', JSON.stringify(response.roles));
                }
            }));
    }

    getUser(): any {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    getRoles(): string[] {
        const roles = sessionStorage.getItem('roles');
        return roles ? JSON.parse(roles) : ["authority"];
    }

    isAuthenticated(): boolean {
        return !!this.getUser();
    }

    hasRole(role: string): boolean {
        const roles = this.getRoles();
        return roles.includes(role);
    }
}
