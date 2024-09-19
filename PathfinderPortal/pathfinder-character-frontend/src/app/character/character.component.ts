import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Character } from '../models/character.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
})
export class CharacterComponent implements OnInit {
  character: Character = {
    id: 0,
    name: '',
    playerName: '',
    class: '',
    level: 0,
    alignment: '',
    deity: '',
    experiencePoints: 0,
    strength: 10,
    dexterity: 10,
    constitution: 10,
    intelligence: 10,
    wisdom: 10,
    charisma: 10,
    initiative: 0,
    armorClass: 0,
    touchAC: 0,
    flatFootedAC: 0,
    cmd: 0,
    cmb: 0,
    baseAttackBonus: 0,
    fortitudeSave: 0,
    reflexSave: 0,
    willSave: 0,
    weapons: '',
    skills: '',
    specialAbilities: '',
  };

  isUpdate: boolean = false; // Define the isUpdate flag

  constructor(private http: HttpClient, private router: Router, private apiService: ApiService) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { character?: Character };

    if (state?.character) {
      this.character = state.character;
      this.isUpdate = true;
    }
  }

  onSubmit() {
    if (this.isUpdate) {
      this.apiService.updateCharacter(this.character).subscribe(
        (response) => {
          console.log('Character updated successfully', response);
          this.router.navigate(['/characters']);
        },
        (error) => {
          console.error('Error updating character', error);
        }
      );
    } else {
      this.http.post('http://localhost:5000/api/character', this.character).subscribe(
        (response) => {
          console.log('Character created successfully', response);
          this.router.navigate(['/characters']);
        },
        (error) => {
          console.error('Error creating character', error);
        }
      );
    }
  }
}
