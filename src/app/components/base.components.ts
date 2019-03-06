import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local/local.storage.service';
import { UsersService } from '../services/user.service';
import { LocalComponentsService } from '../services/local/local.components.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

Component({
  template: ''
});
export class BaseComponent {

  constructor(protected localStorageService: LocalStorageService,
      protected usersService: UsersService,
      protected localComponentsService: LocalComponentsService,
      protected router: Router,
      protected authService: AuthGuardService

      ) {  }

      logout() {
        this.authService.setUserLogged(false);
        this.localStorageService.deleteSession();
        this.localStorageService.cleanAll();
        this.router.navigate(['login']);
      }
}
