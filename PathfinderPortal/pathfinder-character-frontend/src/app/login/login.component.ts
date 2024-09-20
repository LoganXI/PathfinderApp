import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Base64ImageService } from '../services/base64-image.service';  // Import the service

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = { username: '', password: '' };
  logoBase64: string;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private base64ImageService: Base64ImageService  // Inject the Base64ImageService
  ) {
    // Get the Base64 image string from the service
    this.logoBase64 = this.base64ImageService.logoBase64;
  }

  onSubmit() {
    this.http.post<any>('http://localhost:5000/api/auth/login', this.loginData)
      .subscribe(response => {
        // Save the token and navigate to the profile page
        this.authService.saveToken(response.token);
        this.router.navigate(['/profile']);  // Redirect to profile after login
      }, error => {
        alert('Login failed');
      });
  }
}

