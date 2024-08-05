import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Injectable} from "@angular/core";
import {UserModel} from "../../model/user.model";
import {BehaviorSubject} from "rxjs";
import {apiRoot, httpoptions} from "../api.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<UserModel | null>;
    public currentUser$: Observable<UserModel | null>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserModel | null>(this.getUserFromSession());
        this.currentUser$ = this.currentUserSubject.asObservable();
    }

    login(email: string | undefined, password: string | undefined): Observable<any> {
        return this.http.post<any>(`${apiRoot}/login`, {email, password}, {withCredentials: true})
            .pipe(tap(response => {
                if (response) {
                    // console.log("Response User: ", response.user);
                    // console.log("Response Roles: ", response.roles);
                    sessionStorage.setItem('user', JSON.stringify(response.user));
                    sessionStorage.setItem('roles', JSON.stringify(response.roles));
                }
            }));
    }

    refreshUserProfile(): Observable<UserModel> {
        const userId = this.getCurrentUserId(); // Méthode pour obtenir l'ID de l'utilisateur connecté
        return this.http.get<UserModel>(`${apiRoot}/users/${userId}`, httpoptions).pipe(
            tap(user => {
                this.updateUserInSession(user);
            })
        );
    }
    private getUserFromSession(): UserModel | null {
        const userStr = sessionStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    }


    private getCurrentUserId(): number {
        const user = JSON.parse(sessionStorage.getItem('user') || '{}');
        return user.id;
    }

    private updateUserInSession(user: UserModel): void {
        sessionStorage.setItem('user', JSON.stringify(user));
        if (user.role) {
            sessionStorage.setItem('roles', JSON.stringify(user.role));
        }
        this.currentUserSubject.next(user);
    }

    getUser(): any {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    getRoles(): { id: number, name: string, authority: string }[] {
        const roles = sessionStorage.getItem('roles');
        return roles ? JSON.parse(roles) : [];
    }

    isAuthenticated(): boolean {
        return !!this.getUser();
    }

    // hasRole(role: string){
    //     const roles = this.getRoles();
    //     console.log("Bonjour");
    // }
}
