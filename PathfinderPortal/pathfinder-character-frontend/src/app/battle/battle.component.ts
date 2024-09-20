import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss'
})

export class BattleComponent implements OnInit {
  character: Character = {
    id: 0,
    imageBase64:'',
    name: '',
    playerName: '',
    class: '',
    level: 0,
    hitPoints: 0,
    nonLethalHitPoints: 0,
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
    specialAbilities: ''
  };
tempStrengthValue: any;
tempDexterityValue: any;
tempConstitutionValue: any;
tempIntelligenceValue: any;
tempWisdomValue: any;
tempCharismaValue: any;

  constructor(private router: Router) {}

  ngOnInit(): void {

    const state = window.history.state;
    console.log('Navigating with state:', state);  // Check what you get here
    if (state && state.character) {
      this.character = state.character;

      console.log('Edit mode:', this.character);  // See if the character data is here
    } else {

      console.log('No character data, create mode');
    }


  }

  getModifier(stat: number): number {
    return Math.floor((stat - 10) / 2);
  }

}

