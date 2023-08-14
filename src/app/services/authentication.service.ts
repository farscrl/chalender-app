import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import {SystemRole} from "../data/security";
import {SsrCookieService} from "ngx-cookie-service-ssr";

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private TOKEN_KEY = 'token';

    private token = '';
    private systemRoles: SystemRole[] = [];

    constructor(private http: HttpClient, private cookieService: SsrCookieService, private jwtHelperService: JwtHelperService) {
        if (this.cookieService.check(this.TOKEN_KEY)) {
            this.setToken(this.cookieService.get(this.TOKEN_KEY));
        }
    }

    isLoggedIn(): boolean {
        if (this.isTokenExpired()) {
            this.logout();
            return false;
        }
        return !!this.token;
    }

    isTokenExpired(): boolean {
        return !!this.token && this.jwtHelperService.isTokenExpired(this.token);
    }

    login(email: string, password: string): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/signin', {
            email: email,
            password: password
        }, httpOptions);
    }

    register(user: any): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/signup', {
            displayName: user.displayName,
            email: user.email,
            password: user.password,
            matchingPassword: user.matchingPassword,
            socialProvider: 'LOCAL'
        }, httpOptions);
    }

    logout(): void {
        this.token = '';
        this.cookieService.delete(this.TOKEN_KEY);
        localStorage.removeItem(this.TOKEN_KEY);
    }

    authSuccess(token: string): void {
        this.cookieService.set(this.TOKEN_KEY, token);
        localStorage.setItem(this.TOKEN_KEY, token);
        this.setToken(token);
    }

    getToken(): string {
        return this.token;
    }

    isAdmin(): boolean {
        return this.hasSystemRole(SystemRole.ROLE_ADMIN);
    }

    isModerator() {
        return this.hasSystemRole(SystemRole.ROLE_MODERATOR);
    }

    isUser() {
        return this.hasSystemRole(SystemRole.ROLE_USER);
    }

    private setToken(token: string) {
        if (token) {
            this.reset();
            this.token = token;
            this.resolveFeatures(token);
        }
    }

    private reset() {
        this.token = '';
        this.systemRoles = [];
    }

    private resolveFeatures(token: string) {
        const jwtToken = this.jwtHelperService.decodeToken(token);
        const authorities: Array<string> = jwtToken.roles;
        authorities.forEach(authority => {
            try {
                // @ts-ignore
                this.systemRoles.push(SystemRole[authority]);
            } catch (error) {
                console.error(error);
            }
        });
    }

    hasSystemRole(systemRole: SystemRole) {
        return this.isLoggedIn() && this.systemRoles.indexOf(systemRole) !== -1;
    }

    public getId() {
        if (this.token) {
            const jwtToken = this.jwtHelperService.decodeToken(this.token);
            return jwtToken.id;
        }
        return '';
    }

    public getEmail() {
        if (this.token) {
            const jwtToken = this.jwtHelperService.decodeToken(this.token);
            return jwtToken.email;
        }
        return '';
    }

    public getRoles(): SystemRole[] {
        if (this.token) {
            const jwtToken = this.jwtHelperService.decodeToken(this.token);
            return jwtToken.roles;
        } else {
            return [];
        }
    }
}
