import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  character = {
    name: '',
    playerName: '',
    class: '',
    level: null,
    alignment: '',
    deity: '',
    experiencePoints: null,
    strength: null,
    dexterity: null,
    constitution: null,
    intelligence: null,
    wisdom: null,
    charisma: null,
    initiative: null,
    armorClass: null,
    touchAC: null,
    flatFootedAC: null,
    cmd: null,
    cmb: null,
    baseAttackBonus: null,
    fortitudeSave: null,
    reflexSave: null,
    willSave: null,
    weapons: '',
    skills: '',
    specialAbilities: ''
  };

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Retrieve the token from localStorage/sessionStorage
    const token = this.authService.getToken();

    // Make sure the token is available
    if (!token) {
      console.error('No token found');
      return;
    }

    // Attach the Authorization header with the Bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the POST request with headers
    this.http.post('http://localhost:5000/api/character', this.character, { headers })
      .subscribe(
        response => {
          console.log('Character created successfully', response);
          this.router.navigate(['/characters']); // Redirect to the character list after creation
        },
        error => {
          console.error('Error creating character', error);
        }
      );
  }
  // constructor(private http: HttpClient, private router: Router) {}

  // onSubmit() {
  //   this.http.post('http://localhost:5000/api/character', this.character)
  //     .subscribe(
  //       (response) => {
  //         console.log('Character created successfully', response);
  //         this.router.navigate(['/characters']); // Redirect to the character list after creation
  //       },
  //       (error) => {
  //         console.error('Error creating character', error);
  //       }
  //     );
  // }
}

