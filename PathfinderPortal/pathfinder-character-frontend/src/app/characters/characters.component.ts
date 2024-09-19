import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Character } from '../models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html'
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe(
      (response: any) => {
        if (response?.$values) {
          this.characters = response.$values;  // Access the $values array
        } else {
          this.characters = [];  // Handle if $values is missing
        }
        console.log(this.characters);
      },
      error => console.error('Error fetching characters', error)
    );
  }

  deleteCharacter(id: number): void {
    this.apiService.deleteCharacter(id).subscribe(() => {
      this.characters = this.characters.filter(c => c.id !== id);
    }, error => console.error('Error deleting character', error));
  }

  editCharacter(character: Character): void {
    this.router.navigate(['/character/edit'], { state: { character } });
  }

}
