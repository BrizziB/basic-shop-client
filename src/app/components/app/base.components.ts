import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local/local.storage.service';
import { UserService } from '../../services/user.service';
import { LocalComponentsService } from '../../services/local/local.components.service';
import { Router } from '@angular/router';
import { AuthGuardService } from '../../services/auth-guard.service';

Component({
  template: ''
});
export class BaseComponent {

  constructor(protected localStorageService: LocalStorageService,
      protected usersService: UserService,
      protected localComponentsService: LocalComponentsService,
      protected router: Router,
      protected authService: AuthGuardService

      ) {  }

      logout() {
        this.usersService.logout().subscribe(() => {
          this.localStorageService.deleteSession();
          this.localStorageService.deleteConversation();
          this.localStorageService.cleanAll();
          this.authService.setLoggedUser(null);
          this.authService.setSessionID(null);
          this.authService.setUserLogged(false);
          this.router.navigate(['/login']);
        });

      }
}
