import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit(): void {
    // Fetch the logged-in user's profile data
    this.http.get('http://localhost:5000/api/user/profile').subscribe(
      (data) => this.userData = data,
      (error) => console.error('Error fetching profile data', error)
    );
  }

  logout() {
    this.authService.logout();
  }
}
