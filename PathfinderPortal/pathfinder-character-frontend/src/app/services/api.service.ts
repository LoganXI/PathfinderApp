import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/character';  // Base URL for Character API

  constructor(private http: HttpClient) {}

  // Function to get the token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');  // Get the JWT token from localStorage
    return new HttpHeaders({
      Authorization: `Bearer ${token}`  // Attach the token to the Authorization header
    });
  }

  // Call the default Get method
  getCharacterStatus(): Observable<any> {
    return this.http.get<any>(this.baseUrl, { headers: this.getAuthHeaders() });
  }

  // Call the Ping method
  pingCharacterApi(): Observable<string> {
    return this.http.get(`${this.baseUrl}/ping`, {
      headers: this.getAuthHeaders(),
      responseType: 'text'
    });
  }
}
