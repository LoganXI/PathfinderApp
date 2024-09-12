import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  template: `
    <h1>{{ characterStatusMessage }}</h1>
    <h2>{{ pingResponse }}</h2>
  `,
})
export class AppComponent implements OnInit {
  characterStatusMessage = '';
  pingResponse = '';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Call the API to get the character status
    this.apiService.getCharacterStatus().subscribe({
      next: (response) => this.characterStatusMessage = response.message,
      error: (err) => console.error('Error fetching character status', err),
    });

    // Call the API to ping the backend
    this.apiService.pingCharacterApi().subscribe({
      next: (response) => this.pingResponse = response,
      error: (err) => console.error('Error pinging character API', err),
    });
  }
}
