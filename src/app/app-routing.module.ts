import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from './services/auth-guard.service';

import { LoginComponent } from './components/login.component';


const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'}, // poi qui si distinguerà il caso in cui il login è stato effettuato
  {path: 'login', component: LoginComponent}/* ,
  {path: 'note-list', component: NoteListComponent, canActivate: [AuthGuardService]},
  {path: 'note-edit', component: NoteEditComponent, canActivate: [AuthGuardService]},
  {path: 'note-view', component: NoteViewComponent, canActivate: [AuthGuardService]} */
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuardService
  ]
})
export class AppRoutingModule { }
