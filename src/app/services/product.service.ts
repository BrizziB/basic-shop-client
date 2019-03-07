import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { isUndefined, isNullOrUndefined } from 'util';
import { LocalStorageService } from './local/local.storage.service';
import { Product } from '../model/Product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

    /*****************************************************************************
      gli errori nelle response non vengono gestiti - per semplicità
    ******************************************************************************/


  getProducts(): Observable<HttpResponse<Product[]>> {
    const url = 'http://localhost:8080/basic-shop/rest/products';
    const req = this.http.get<Product[]>(
      url, {withCredentials: true, headers: this.httpOptions.headers, observe: 'response'});
    return req;
  }

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
    ) {}
}

