import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = environment.apiUrl;
  private authTokenKey = '@token';

  private decodeToken(token: string): any {
    try {
      if (!token) {
        return null;
      }
  
      const decodedToken = jwtDecode(token);
      return decodedToken;
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  logout(): void {
    this.setAuthToken('');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  getCurrentUser(): any {
    const token = this.getAuthToken() ?? '';
    return this.decodeToken(token);
  }

  getUserId(): string | null {
    const token = this.getAuthToken() ?? '';
    const decodedToken = this.decodeToken(token);
    return decodedToken?.sub ?? null;
  }

  getUserRole(): string | null {
    const token = this.getAuthToken() ?? '';
    const decodedToken = this.decodeToken(token);
    return decodedToken?.role ?? null;
  }

  clearToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
  
  getUserName(): string | null {
    const token = this.getAuthToken() ?? ''
    const decodedToken = this.decodeToken(token)
    return decodedToken?.nome ?? null
  }
  
  private getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  private setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }  
}
