import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';

import { User } from '../model/User';
import { LocalStorageService } from './local/local.storage.service';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthGuardService implements CanActivate {

  private userLogged: boolean;
  private loggedUser: User;
  private sessionID: String;

  getSessionID(): String {
    return this.sessionID;
  }

  setSessionID(id: String): void {
    this.sessionID = id;
  }

  setUserLogged(logged: boolean): void {
    this.userLogged = logged;
  }

  setLoggedUser(user: User): void {
    this.loggedUser = user;
  }

  getLoggedUser(): User {
    return this.loggedUser;
  }

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.userLogged) {// caso base
      return true;

    } if (!isNullOrUndefined(this.localStorageService.loadSession())) { // caso in cui si è ripristinata la sessione
        return true;

    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }

}
