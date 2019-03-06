import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';
import { LocalStorageService } from './local/local.storage.service';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  cid: Number;
  otherCid: Number;
  public conversationActive = false;
  public otherConversationActive = false;

    /*****************************************************************************
      gli errori nelle response non vengono gestiti - per semplicità
    ******************************************************************************/


  login(body: String): Observable<HttpResponse<Object>> {
    const url = 'http://localhost:8080/basic-shop/rest/login';
    const req = this.http.post<HttpResponse<Object>>(
      url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {}
}
