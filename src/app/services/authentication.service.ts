import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { SystemRole } from "../data/security";
import { SsrCookieService } from "ngx-cookie-service-ssr";
import jwt_decode from "jwt-decode";
import { UserDto } from "../data/user";

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

    constructor(private http: HttpClient, private cookieService: SsrCookieService) {
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

    login(email: string, password: string): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/signin', {
            email: email,
            password: password
        }, httpOptions);
    }

    register(email: string, password: string, firstName: string, lastName: string, organisation: string): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/signup', {
            firstName: firstName,
            lastName: lastName,
            organisation: organisation,
            email: email,
            password: password,
            socialProvider: 'LOCAL'
        }, httpOptions);
    }

    confirmEmail(code: string): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/confirm-email?code=' + code, httpOptions);
    }

    resetPassword(email: string): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/reset-password?email=' + email, httpOptions);
    }

    resetRedefinePassword(token: string, password: string): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/redefine-password?token=' + token + '&password=' + password, httpOptions);
    }

    loadProfile(): Observable<UserDto> {
        return this.http.get<UserDto>(environment.apiBasePath + 'user/auth/profile', httpOptions);
    }

    saveProfile(userDto: UserDto): Observable<UserDto> {
        return this.http.post<UserDto>(environment.apiBasePath + 'user/auth/profile', JSON.stringify(userDto), httpOptions);
    }

    changePassword(currentPassword: string, newPassword: string): Observable<any> {
        return this.http.post(environment.apiBasePath + 'user/auth/change-password', {
            currentPassword: currentPassword,
            newPassword: newPassword
        }, httpOptions);
    }

    deleteProfile(password: string, mode: string): Observable<void> {
        const data = {
            password: password,
            mode: mode
        };
        return this.http.post<void>(environment.apiBasePath + 'user/auth/profile/delete', JSON.stringify(data), httpOptions);
    }

    logout(): void {
        this.token = '';
        this.cookieService.delete(this.TOKEN_KEY, '/');
    }

    authSuccess(token: string): void {
        this.cookieService.set(this.TOKEN_KEY, token, {path: '/'});
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
        const jwtToken = this.getDecodedToken();
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

    public getId(): string {
        if (this.token) {
            const jwtToken = this.getDecodedToken();
            return jwtToken.id;
        }
        return '';
    }

    public getEmail(): string {
        if (this.token) {
            const jwtToken = this.getDecodedToken();
            return jwtToken.email;
        }
        return '';
    }

    public getRoles(): SystemRole[] {
        if (this.token) {
            const jwtToken = this.getDecodedToken();
            return jwtToken.roles;
        } else {
            return [];
        }
    }

    public getDecodedToken(): any {
        if (this.token) {
            return jwt_decode(this.token);
        }
        return {};
    }

    public isTokenExpired(): boolean {
        const decodedToken = this.getDecodedToken();
        if (!decodedToken.exp) {
            return true;
        }

        return Date.now() > decodedToken.exp * 1000;
    }
}
