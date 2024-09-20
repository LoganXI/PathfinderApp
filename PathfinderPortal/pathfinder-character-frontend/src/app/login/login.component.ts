import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = { username: '', password: '' };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

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
