import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OrderComponent } from './components/order/order.component';
import { InfoFormFirstComponent } from './components/info-form/info-form-first.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // poi qui si distinguerà il caso in cui il login è stato effettuato
  {path: 'login', component: LoginComponent},
  {path: 'app-home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'app-order', component: OrderComponent, canActivate: [AuthGuardService]},
  {path: 'app-info-form-first', component: InfoFormFirstComponent, canActivate: [AuthGuardService]}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
