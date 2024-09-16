import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};  // To hold user profile data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');  // Get the token from localStorage

    if (token) {
      this.http.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .subscribe(
        (response: any) => {
          this.userProfile = response;
        },
        (error) => {
          console.error('Error fetching profile', error);
        }
      );
    } else {
      console.error('No token found');
    }
  }

}
