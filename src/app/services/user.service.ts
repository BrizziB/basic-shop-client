import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';
import { LocalStorageService } from './local/local.storage.service';
import { User } from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private cid: Number;
  private conversationActive = false;
  public user: User = new User;



  public setCid(newCid: Number) {
    this.cid = newCid;
  }

  public getCid(): Number {
    return this.cid;
  }

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {}

    /*****************************************************************************
      gli errori nelle response non vengono gestiti - per semplicità

      XMLHttpRequest.withCredentials Is a Boolean that indicates whether or not
      cross-site Access-Control requests should be made using credentials such
      as cookies or authorization headers. The default is false.

      [observe: 'response']  serve per leggere tutta la risposta http

      i metodi che richiedono l'uso del conversation bean remoto specificano ed
      usano il campo cid. tale campo può essere ripristinato da localStorage
      Il ripristino del cid (quando serve averlo) viene garantito dalla procedura
      di init dei componenti info-form: questa verifica che un cid sia
      presente e valido e ne richiede uno nuovo in caso di assenza.
      Quindi metodi relativi alla conversazione vengono richiamati solo dai
      componenti info-form, in ogni caso quindi un cid sarà presente o richiesto
    ******************************************************************************/


  login(body: String): Observable<HttpResponse<Object>> {
    // questo metodo è uguale anche nella versione REST
    // ritorna una risposta HTTP contenente i dati dell'utente loggato
    const url = 'http://localhost:8080/basic-shop/rest/log/in';
    const req = this.http.post<HttpResponse<Object>>(
      url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  logout(): Observable<HttpResponse<Object>> {
    this.cid = null;
    this.user = new User;

    const url = 'http://localhost:8080/basic-shop/rest/log/out';
    const req = this.http.delete<HttpResponse<Object>>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  getUser(): Observable<HttpResponse<User>> {  // così funziona uguale la sessione ?
    const url = 'http://localhost:8080/basic-shop/rest/user/get';
    const req = this.http.get<User>(
      url, {withCredentials: true, observe: 'response', headers: this.httpOptions.headers});
    return req;
  }

  getUserInfo(): Observable<HttpResponse<User>> {  // così funziona uguale la sessione ?
    const url = 'http://localhost:8080/basic-shop/rest/user/info-conversation/data/?cid=' + this.cid;
    const req = this.http.get<User>(
      url, {withCredentials: true, observe: 'response', headers: this.httpOptions.headers});
    return req;
  }

  startInformationConversation(): Observable<HttpResponse<Object>> {
      const url = 'http://localhost:8080/basic-shop/rest/user/info-conversation/start';
      const req = this.http.get<HttpResponse<Object>>(
        url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      this.conversationActive = true;
      return req;
  }

  updateConversation(body): Observable<HttpResponse<Object>> {
    if (isNullOrUndefined(this.cid)) {
      console.log('cid is null');
      return null;
    }
    const url = 'http://localhost:8080/basic-shop/rest/user/info-conversation/update/?cid=' + this.cid;
    const req = this.http.post<HttpResponse<Object>>(
      url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  getConversation(): Observable<HttpResponse<Object>> {
    if (isNullOrUndefined(this.cid)) {
      console.log('cid is null');
      return null;
    }
    const url = 'http://localhost:8080/basic-shop/rest/user/info-conversation/status/?cid=' + this.cid;
    const req = this.http.get<HttpResponse<Object>>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  endConversation(): Observable<HttpResponse<Object>> {
    if (isNullOrUndefined(this.cid)) {
      return null;
    }
    const url = 'http://localhost:8080/basic-shop/rest/user/info-conversation/end/?cid=' + this.cid;
    const req = this.http.delete<HttpResponse<Object>>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    this.cid = null;
    this.conversationActive = false;
    return req;
  }

  convCheck(): Observable<HttpResponse<boolean>> {
    const url = 'http://localhost:8080/basic-shop/rest/user/info-conversation/check/?cid=' + this.cid;
    const req = this.http.get<boolean>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }


}

