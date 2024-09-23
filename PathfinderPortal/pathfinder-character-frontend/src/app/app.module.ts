import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { CharacterComponent } from './character/character.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CharactersComponent } from './characters/characters.component';
import { RegisterComponent } from './register/register.component';
import { BattleComponent } from './battle/battle.component';
import { Base64ImageService } from './services/base64-image.service';
import { GameMasterComponent } from './gamemaster/gamemaster.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    CharacterComponent,
    NavbarComponent,
    CharactersComponent,
    RegisterComponent,
    BattleComponent,
    GameMasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    Base64ImageService,  // Provide the Base64ImageService
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true  // Allows multiple interceptors to be used
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
