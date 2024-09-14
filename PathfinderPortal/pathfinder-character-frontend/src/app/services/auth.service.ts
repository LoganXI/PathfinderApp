import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  // Save JWT to localStorage
  saveToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  // Get the saved token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Logout by removing the token
  logout() {
    localStorage.removeItem('authToken');
  }
}
