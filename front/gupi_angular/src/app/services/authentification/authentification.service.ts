import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    // Méthode pour se connecter
    login() {
        // ... logique de connexion
        this.loggedIn.next(true);
    }

    // Méthode pour se déconnecter
    logout() {
        // ... logique de déconnexion
        this.loggedIn.next(false);
    }
}
