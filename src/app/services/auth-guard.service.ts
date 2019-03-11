import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { User } from '../model/User';
import { LocalStorageService } from './local/local.storage.service';
import { isNullOrUndefined } from 'util';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuardService implements CanActivate {

  private userLogged: boolean;
  private loggedUser: User;
  private sessionID: String;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}


  authCheck(): Observable<HttpResponse<String>>{
    const url = 'http://localhost:8080/basic-shop/rest/user/check-auth';
    const req = this.http.get<String>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    /*****************************************************************************
      determina se un routing è possibile o meno,
      controlla che l'utente sia loggato o che esista una sessione da recuperare,
      se così non è, il metodo ritorna false, bloccando il routing
    ******************************************************************************/
    if (this.userLogged) {// caso base
      return true;

    } if (!isNullOrUndefined(this.localStorageService.loadSession())) { // caso in cui si è ripristinata la sessione
       this.authCheck().subscribe( // si verifica che la sessione sia ancora presente sul server
        (resp: HttpResponse<String> ) => {
          if (isNullOrUndefined(resp.body)) { // caso in cui è scaduta la sessione sul server
            this.router.navigate(['/login']);
            return false;
          } else {
            this.userLogged = true;
            this.sessionID = resp.body;
            this.router.navigate(['/app-home']);
            return true;
          }
        });
    } else {
        this.router.navigate(['/login']);
        return false;
    }
    this.router.navigate(['/login']);
  }

}
