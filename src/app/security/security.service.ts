import { Injectable, Input } from '@angular/core';
import {
  AuthenticationResponse,
  UserCredentials,
  UserDto,
} from './security.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl + '/accounts';
  private readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration';
  private readonly roleField = 'role';

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return false;
    }

    const expiration = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration);
    if (expirationDate <= new Date()) {
      this.logout();
      return false;
    }

    return true;
  }

  getUsers(page: number, recordsPerPage: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<UserDto[]>(`${this.apiUrl}/listusers`, {
      observe: 'response',
      params,
    });
  }

  makeAdmin(userId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiUrl}/makeadmin`, JSON.stringify(userId), {
      headers,
    });
  }

  removeAdmin(userId: string) {
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(
      `${this.apiUrl}/removeadmin`,
      JSON.stringify(userId),
      { headers }
    );
  }

  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token) {
      return '';
    }

    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
  }

  getRole(): string {
    return this.getFieldFromJWT(this.roleField);
  }

  register(
    userCredentials: UserCredentials
  ): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      this.apiUrl + '/create',
      userCredentials
    );
  }

  login(userCredentials: UserCredentials): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(
      this.apiUrl + '/login',
      userCredentials
    );
  }

  saveToken(authenticationResponse: AuthenticationResponse) {
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(
      this.expirationTokenKey,
      authenticationResponse.expiration.toString()
    );
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }
}
