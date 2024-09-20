import { Component, OnInit } from '@angular/core';
import { Character } from '../models/character.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrl: './battle.component.scss',
})
export class BattleComponent implements OnInit {
  character: Character = {
    id: 0,
    imageBase64: '',
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
    specialAbilities: '',
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
    console.log('Navigating with state:', state); // Check what you get here
    if (state && state.character) {
      this.character = state.character;

      console.log('Edit mode:', this.character); // See if the character data is here
    } else {
      console.log('No character data, create mode');
    }
  }

  getModifier(stat: number): number {
    return Math.floor((stat - 10) / 2);
  }

  sections = {
    health: true,
    stats: true,
    otherStats: true,
    weapons: true,
    skills: true,
    abilities: true,
  };

  // Toggle visibility for a specific section
  toggleSection(section: string) {
    if (section === 'health') {
      this.sections.health = !this.sections.health;
    } else if (section === 'stats') {
      this.sections.stats = !this.sections.stats;
    } else if (section === 'otherStats') {
      this.sections.otherStats = !this.sections.otherStats;
    } else if (section === 'weapons') {
      this.sections.weapons = !this.sections.weapons;
    } else if (section === 'skills') {
      this.sections.skills = !this.sections.skills;
    } else if (section === 'abilities') {
      this.sections.abilities = !this.sections.abilities;
    }
  }

  // Check if a section is active
  isSectionActive(section: string): boolean {
    if (section === 'health') {
      return this.sections.health;
    }
     if (section === 'stats') {
      return this.sections.stats;
    }
     if (section === 'otherStats') {
      return this.sections.otherStats;
    }
     if (section === 'weapons') {
      return this.sections.weapons;
    }
     if (section === 'skills') {
      return this.sections.skills;
    }
     if (section === 'abilities') {
      return this.sections.abilities;
    }
   return false;
  }
}
