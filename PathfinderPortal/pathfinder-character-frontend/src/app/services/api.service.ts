import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:5000/api/character'; // Base URL for the CharacterController

  constructor(private http: HttpClient) { }

  // Call the default Get method
  getCharacterStatus(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Call the Ping method
  pingCharacterApi(): Observable<string> {
    return this.http.get(`${this.baseUrl}/ping`, { responseType: 'text' });
  }
}
