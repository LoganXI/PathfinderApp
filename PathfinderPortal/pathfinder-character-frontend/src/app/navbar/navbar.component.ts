import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Base64ImageService } from '../services/base64-image.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  logoBase64: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private base64ImageService: Base64ImageService
  ) {}

  ngOnInit(): void {
    // Assign the Base64 image string from the service
    this.logoBase64 = this.base64ImageService.logoBase64;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }
}
