import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html'
})
export class CharactersComponent implements OnInit {
  characters = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Fetch the list of characters
    this.http.get('http://localhost:5000/api/characters')
      .subscribe(
        (data: any) => {
          this.characters = data;
        },
        (error) => {
          console.error('Error fetching characters', error);
        }
      );
  }
}
