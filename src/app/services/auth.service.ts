import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { switchMap, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment'
import { Auth } from '../models/auth.model'
import { User } from '../models/user.model'
import { TokenService } from './token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) { }

  login(email: string, password: string){
    return this.http.post<Auth>(`${this.apiUrl}/login`, {email, password})
    .pipe(
      tap((res) => {
        this.tokenService.saveToken(res.access_token);
        this.router.navigate(['']);
      })
    );
  }

  logOut() {
    this.clearStorage();
    this.router.navigate(['/auth']);
  }

  clearStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  profile(token: string){
    const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${token}`)
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      }
    });
  }
}
