import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { InfoFormFirstComponent } from './components/info-form/info-form-first.component';
import { InfoFormSecondComponent } from './components/info-form/info-form-second.component';
import { InfoFormThirdComponent } from './components/info-form/info-form-third.component';
import { InfoReviewComponent } from './components/info-form/info-review.component';


const routes: Routes = [
  // controllo del routing, utilizza la funzione canActivate implementata in AuthGuardService
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'app-home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'app-order', component: OrderComponent, canActivate: [AuthGuardService]},
  {path: 'app-info-form-first', component: InfoFormFirstComponent, canActivate: [AuthGuardService]},
  {path: 'app-info-form-second', component: InfoFormSecondComponent, canActivate: [AuthGuardService]},
  {path: 'app-info-form-third', component: InfoFormThirdComponent, canActivate: [AuthGuardService]},
  {path: 'app-info-review', component: InfoReviewComponent, canActivate: [AuthGuardService]},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
