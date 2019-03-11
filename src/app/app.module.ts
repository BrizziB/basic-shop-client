import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { UsersService } from './services/user.service';
import { LocalStorageService } from './services/local/local.storage.service';
import { LocalComponentsService } from './services/local/local.components.service';
import { HomeComponent } from '../app/components/home/home.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { OrderComponent } from '../app/components/order/order.component';
import { ProductsService } from './services/product.service';
import { OrderService } from './services/order.service';
import { AuthGuardService } from './services/auth-guard.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UsersService,
    ProductsService,
    OrderService,
    AuthGuardService,
    LocalComponentsService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
