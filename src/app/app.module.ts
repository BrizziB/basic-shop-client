import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { LoginComponent } from './components/login/login.component';
import { UserService } from './services/user.service';
import { LocalStorageService } from './services/local/local.storage.service';
import { HomeComponent } from '../app/components/home/home.component';
import { HeaderComponent } from '../app/components/header/header.component';
import { OrderComponent } from '../app/components/order/order.component';
import { ProductsService } from './services/product.service';
import { OrderService } from './services/order.service';
import { AuthGuardService } from './services/auth-guard.service';
import { InfoFormComponent } from './components/info-form/info-form.component';
import { InfoFormFirstComponent } from './components/info-form/info-form-first.component';
import { InfoFormSecondComponent } from './components/info-form/info-form-second.component';
import { InfoFormThirdComponent } from './components/info-form/info-form-third.component';
import { InfoReviewComponent } from './components/info-form/info-review.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    OrderComponent,
    InfoFormComponent,
    InfoFormFirstComponent,
    InfoFormSecondComponent,
    InfoFormThirdComponent,
    InfoReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    ProductsService,
    OrderService,
    AuthGuardService,
    LocalStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
