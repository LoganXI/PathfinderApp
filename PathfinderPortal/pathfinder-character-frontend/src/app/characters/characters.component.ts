import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Character } from '../models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = [];
  searchTerm: string = '';  // Store the search term
  flipStates: Map<number, boolean> = new Map(); // Store flip state for each character by ID
  buttonStates: Map<number, boolean> = new Map(); // Track button visibility for each character

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.apiService.getCharacters().subscribe(
      (response: any) => {
        if (response?.$values) {
          this.characters = response.$values;

          // Initialize button visibility for all characters to true, but only if character.id exists
          this.characters.forEach(character => {
            if (character.id !== undefined) { // Check if character.id is defined
              this.buttonStates.set(character.id, true); // All buttons visible at start
            }
          });
        } else {
          this.characters = [];
        }
      },
      error => console.error('Error fetching characters', error)
    );
  }

  // Filter characters based on the search term
  filteredCharacters(): Character[] {
    if (!this.searchTerm) {
      return this.characters;
    }
    return this.characters.filter(character =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  deleteCharacter(id: number): void {
    this.apiService.deleteCharacter(id).subscribe(() => {
      this.characters = this.characters.filter(c => c.id !== id);
    }, error => console.error('Error deleting character', error));
  }

  editCharacter(character: Character): void {
    console.log('Navigating with character:', character);
    this.router.navigate(['/create-character'], { state: { character: character } });
  }

  startBattle(character: Character): void {
    this.router.navigate(['/battle'], { state: { character: character } });
  }

  goCreation() {
    this.router.navigate(['/create-character']);
  }

  flipCard(characterId: number): void {
    const currentFlipState = this.flipStates.get(characterId) || false;
    this.flipStates.set(characterId, !currentFlipState); // Toggle the flip state

    if (!currentFlipState) {
      // If flipping to the back, hide the buttons immediately
      this.buttonStates.set(characterId, false);
    } else {
      // If flipping back, hide the buttons first, then show them after the flip animation
      this.buttonStates.set(characterId, false);
      setTimeout(() => {
        this.buttonStates.set(characterId, true); // Show buttons after the flip-back animation finishes (600ms delay)
      }, 600); // Adjust the delay to match the duration of your flip animation
    }
  }

  showButtons(characterId: number): boolean {
    return this.buttonStates.get(characterId) || false;
  }

  // Check if a card is flipped based on its state in the map
  isFlipped(characterId: number): boolean {
    return this.flipStates.get(characterId) || false;
  }

  // Confirm delete method
  confirmDelete(id: number): void {
    this.apiService.deleteCharacter(id).subscribe(() => {
      this.characters = this.characters.filter(c => c.id !== id);
      this.flipStates.delete(id); // Remove flip state after deletion
    }, error => console.error('Error deleting character', error));
  }
}
