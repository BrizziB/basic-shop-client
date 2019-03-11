import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';
import { LocalStorageService } from './local/local.storage.service';
import { Order } from '../model/Order';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
    /*****************************************************************************
      gli errori nelle response non vengono gestiti - per semplicità
    ******************************************************************************/
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {}

    getOrderStateful(): Observable<HttpResponse<Order>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/get';
      const req = this.http.get<Order>(
        url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

    getOrderStateless(userID: Number): Observable<HttpResponse<Order>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/get/' + userID;
      const req = this.http.get<Order>(
        url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

    removeProductFromOrderStateful(body: String): Observable<HttpResponse<Boolean>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/remove';
      const req = this.http.put<Boolean>(
        url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

    removeProductFromOrderStateless(body: String, userID: Number): Observable<HttpResponse<Boolean>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/remove/' + userID;
      const req = this.http.put<Boolean>(
        url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

    addProductToOrderStateful(body: String): Observable<HttpResponse<Boolean>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/add';
      const req = this.http.put<Boolean>(
        url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

    addProductToOrderStateless(body: String, userID: Number): Observable<HttpResponse<Boolean>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/add/' + userID;
      const req = this.http.put<Boolean>(
        url, body, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

    completeOrderStateful(): Observable<HttpResponse<Boolean>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/complete';
      const req = this.http.put<Boolean>(
        url, null, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

    completeOrderStateless(userID: Number): Observable<HttpResponse<Boolean>> {
      const url = 'http://localhost:8080/basic-shop/rest/order/complete/' + userID;
      const req = this.http.put<Boolean>(
        url, null, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
      return req;
    }

}

