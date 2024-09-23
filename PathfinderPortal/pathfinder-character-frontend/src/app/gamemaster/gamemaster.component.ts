import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-gamemaster',
  templateUrl: './gamemaster.component.html',
  styleUrls: ['./gamemaster.component.scss']
})
export class GameMasterComponent implements OnInit {
  availableCharacters: any[] = []; // All characters available for selection
  watchedCharacters: any[] = []; // Characters currently being monitored
  isAnyCharacterSelected: boolean = false; // Track if any characters are selected

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Fetch available characters
    this.apiService.getCharacters().subscribe((response: any) => {
      this.availableCharacters = response.$values || [];
      this.availableCharacters.forEach(character => {
        character.isSelected = false; // By default, no characters are selected
      });
      this.checkSelection(); // Check if any characters are selected initially
    });
  }

  // Check if any characters are selected
  checkSelection(): void {
    this.isAnyCharacterSelected = this.availableCharacters.some(c => c.isSelected);
  }

  // Add selected characters to the watchedCharacters list
  addSelectedCharacters(): void {
    const selectedCharacters = this.availableCharacters.filter(c => c.isSelected);
    this.watchedCharacters = this.watchedCharacters.concat(selectedCharacters);
    this.updateAvailableCharacters(); // Update available characters after selection
  }

  // Remove a character from the watched list and return it to the available characters
  removeCharacter(characterId: number): void {
    const removedCharacter = this.watchedCharacters.find(c => c.id === characterId);
    if (removedCharacter) {
      this.availableCharacters.push(removedCharacter);
      this.watchedCharacters = this.watchedCharacters.filter(c => c.id !== characterId);
      this.checkSelection(); // Update button visibility after character is removed
    }
  }

  // Filter out characters that are already being watched from the modal list
  updateAvailableCharacters(): void {
    const watchedIds = this.watchedCharacters.map(c => c.id);
    this.availableCharacters = this.availableCharacters
      .map(c => {
        c.isSelected = false; // Reset selection
        return c;
      })
      .filter(c => !watchedIds.includes(c.id)); // Exclude characters being watched

    this.checkSelection(); // Update button visibility after update
  }
}
