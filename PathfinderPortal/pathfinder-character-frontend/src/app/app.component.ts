import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service'; // Import AuthService
import { Router } from '@angular/router'; // Import Router for redirection

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  template: `
    <h1>{{ characterStatusMessage }}</h1>
    <h2>{{ pingResponse }}</h2>
  `,
})
export class AppComponent implements OnInit {
  title = 'Pathfinder Portal';
  characterStatusMessage = '';
  pingResponse = '';

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    // if (this.authService.isLoggedIn()) {
    //   // User is logged in, make API calls
    //   this.apiService.getCharacterStatus().subscribe({
    //     next: (response) => this.characterStatusMessage = response.message,
    //     error: (err) => console.error('Error fetching character status', err),
    //   });

    //   this.apiService.pingCharacterApi().subscribe({
    //     next: (response) => this.pingResponse = response,
    //     error: (err) => console.error('Error pinging character API', err),
    //   });
    // } else {
    //   // User is not logged in, redirect to the login page
    //   console.log('User is not logged in, redirecting to login page');
    //   this.router.navigate(['/login']);
    // }
  }
}
