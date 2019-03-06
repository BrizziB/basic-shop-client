import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login.component';
import { UsersService } from './services/user.service';
import { LocalStorageService } from './services/local/local.storage.service';
import { LocalComponentsService } from './services/local/local.components.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    LocalComponentsService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
