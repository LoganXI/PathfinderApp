import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { CharacterComponent } from './character/character.component';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CharactersComponent } from './characters/characters.component';
import { RegisterComponent } from './register/register.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [

  { path: 'battle', component: BattleComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'create-character', component: CharacterComponent, canActivate: [AuthGuard] },
  { path: 'characters', component: CharactersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login if no path
  { path: '**', redirectTo: '/login' } // Wildcard route to redirect unknown paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
