import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ProductsService } from '../../services/product.service';
import { HttpResponse } from '@angular/common/http';
import { OrderService } from '../../services/order.service';
import { AuthGuardService } from '../../services/auth-guard.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  /**************************************************************************************************************
  | Questo componente funziona da home: mostra gli oggetti in vendita e ne permette l'aggiunta all'ordinazione, *
  | permette di spostarsi sulla pagina dell'ordinazione dell'utente,                                            *
  | permette poi di aprire la pagina di inserimento informazioni e quella di revisione delle informazioni       *
  |                                                                                                             *
  ***************************************************************************************************************/


  constructor(
    protected productService: ProductsService,
    protected orderService: OrderService,
    protected authService: AuthGuardService
  ) { }

  products: Product[];
  user: User;

  ngOnInit() {
  // l'inizializzazione del componente consiste nel caricare l'utente e richiedere al server la lista dei prodotti
    this.user = this.authService.getLoggedUser();
    this.productService.getProducts().subscribe(
      ((resp: HttpResponse<Product[]>) => {
        if (resp !== null) {
          this.products = resp.body;
        }
      })
    );
  }

  addToOrder(prod: Product): void {
  // aggiunge il prodotto prod all'ordine dello user (l'ordine è unico per ogni user)
    const body = JSON.stringify({
      id: prod.id
    });
    this.orderService.addProductToOrderStateful(body).subscribe(
      (resp) => {
        if (resp.body === true) {
          console.log('product with ID ' + prod.id + 'added to order');
        }
      }
    );
  }

}
