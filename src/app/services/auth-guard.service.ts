import { Injectable } from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { User } from '../model/User';
import { LocalStorageService } from './local/local.storage.service';
import { isNullOrUndefined, isNull } from 'util';
import { of, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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


  private authCheck(): Observable<HttpResponse<String>> {
    const url = 'http://localhost:8080/basic-shop/rest/user/check-auth';
    const req = this.http.get<String>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|boolean {
    /*****************************************************************************
      determina se un routing è possibile o meno,
      controlla che l'utente sia loggato o che esista una sessione da recuperare,
      se così non è, il metodo ritorna false, bloccando il routing
    ******************************************************************************/
    if (this.userLogged) {// caso base
      return true;

    }  if (!isNullOrUndefined(this.localStorageService.loadSession()))  { // caso in cui si è ripristinata la sessione
        /* qui si ritorna un Observable<boolean>
        in questo modo è possibile risolvere il canActivate in maniera asincrona
        con pipe si mettono in fila azioni asincrone; in questo caso il map,  mappa una risposta di tipo HttpResponse<String>
        in un booleano, che risolve il canActivate.
        */
        return this.authCheck().pipe(
          map( (response: HttpResponse<String>) => {
            if (!isNullOrUndefined(response.body)) {
              this.userLogged = true;
              this.sessionID = response.body;
              return true;
            } else {
                this.router.navigate(['/login']);
                return false;
            }
          }),
          catchError(() => of(false))
        );
    } else {
        this.router.navigate(['/login']);
        return false;
    }
  }

}
