import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};  // To hold user profile data

  profileData: any;

  // constructor(private http: HttpClient, private authService: AuthService) {}

  // ngOnInit(): void {
  //   const token = this.authService.getToken();
  //   console.log('Token:', token); //TOGLIMIII!!!
  //   if (!token) {
  //     console.error('No token found');
  //     return;
  //   }

  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //   this.http.get('http://localhost:5000/api/profile', { headers })
  //     .subscribe(
  //       response => {
  //         this.profileData = response;
  //       },
  //       error => {
  //         console.error('Error fetching profile', error);
  //       }
  //     );
  // }
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
