import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post('http://localhost:5000/api/auth/register', this.user)
      .subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);  // Redirect to login page after successful registration
        },
        error => {
          if (error.status === 400 && error.error === 'Username already exists.') {
            alert('Username already exists. Please choose another one.');
          } else {
            console.error('Error registering user', error);
            alert('Registration failed. Please try again.');
          }
        }
      );
  }


}
