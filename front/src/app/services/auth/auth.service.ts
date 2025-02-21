import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './../token/token.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email: String = '';
  id: any;
  user: any;
  role: string = '';


  private API_URL = 'http://localhost:8080/auth/login';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(credentials: { username: string; password: string }): Observable<{ token: String}> {
    return this.http
      .post<{ userId: number; email: String; token: string; username: string; role: string }>(
        this.API_URL,
        credentials
      )
      .pipe(
        tap((response) => {
          this.tokenService.saveToken(response.token);
          this.email = response.email;
          this.id = response.userId;
          this.user = response.username;
          this.role = response.role
          this.storeCredencials();
        })
      );
  }

  storeCredencials() {
    sessionStorage.setItem('email', this.email.toString());
    sessionStorage.setItem('id', this.id);
    sessionStorage.setItem('username', this.user.toString());
    sessionStorage.setItem('role', this.role);
  }

  logout(): void {
    this.tokenService.removeToken();
  }

  public register(user: any): Observable<any> {
    return this.http.post(this.API_URL + '/save', user);

  }

}
