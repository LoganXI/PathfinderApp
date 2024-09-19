import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/character';  // Base URL for Character API

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Function to get the token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');  // Get the JWT token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`  // Attach the token to the Authorization header
    });
  }

  getCharacters(): Observable<Character[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<Character[]>('http://localhost:5000/api/character', { headers });
  }

  // Call the default Get method
  getCharacterStatus(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.getAuthHeaders() });
  }


  updateCharacter(character: Character): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put(`http://localhost:5000/api/character/${character.id}`, character, { headers });
  }

  deleteCharacter(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.delete(`http://localhost:5000/api/character/${id}`, { headers });
  }


  // Call the Ping method
  pingCharacterApi(): Observable<string> {
    return this.http.get(`${this.baseUrl}/ping`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }
}
