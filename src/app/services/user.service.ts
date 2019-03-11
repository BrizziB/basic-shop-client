import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';
import { LocalStorageService } from './local/local.storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  cid: Number;
  public conversationActive = false;

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {}

    /*****************************************************************************
      gli errori nelle response non vengono gestiti - per semplicità
    ******************************************************************************/


  login(body: String): Observable<HttpResponse<Object>> {
    const url = 'http://localhost:8080/basic-shop/rest/login';
    const req = this.http.post<HttpResponse<Object>>(
      url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  startInformationConversation(): Observable<HttpResponse<Object>> {
    const url = 'http://localhost:8080/prova/rest/info-conversation/start';
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
    const url = 'http://localhost:8080/prova/rest/info-conversation/update/?cid=' + this.cid;
    const req = this.http.post<HttpResponse<Object>>(
      url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  getConversation(): Observable<HttpResponse<Object>> {
    if (isNullOrUndefined(this.cid)) {
      console.log('cid is null');
      return null;
    }
    const url = 'http://localhost:8080/prova/rest/info-conversation/status?cid=' + this.cid;
    const req = this.http.get<HttpResponse<Object>>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  endConversation(): Observable<HttpResponse<Object>> {
    if (isNullOrUndefined(this.cid)) {
      return null;
    }
    const url = 'http://localhost:8080/prova/rest/info-conversation/end/?cid=' + this.cid;
    const req = this.http.delete<HttpResponse<Object>>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    this.cid = null;
    this.conversationActive = false;
    return req;
  }


}

