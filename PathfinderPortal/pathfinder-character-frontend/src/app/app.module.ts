import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { AppComponent } from './app.component';
import { ApiService } from './services/api.service';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component'; // Import your service
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule  // Add HttpClientModule here
  ],
  providers: [ApiService],  // Add ApiService here if it's not providedIn: 'root'
  bootstrap: [AppComponent]

})
export class AppModule { }
