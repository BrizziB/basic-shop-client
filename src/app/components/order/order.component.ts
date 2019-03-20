import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/Order';
import { Product } from '../../model/Product';
import { HttpResponse } from '@angular/common/http';
import { OrderService } from '../../services/order.service';
import { isNullOrUndefined } from 'util';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

    /************************************************************************************
  Questo componente mostra la lista dei prodotti selezioni dall'utente ,              *
  permette di completare l'ordine o di rimuovere prodotti da esso                     *
                                                                                      *
  Il servizio OrderService permette operazioni CRUD sull'ordinazione dell'            *
  utente loggato, lo fa sfruttando la Sessione mantenuta sul server: le richieste http*
  non specificano alcun userID, tuttavia il mittente viene riconosciuto dal server    *
  e mappato alla servlet dedicata, in cui è in vita il session bean contenente lo     *
  lo userID dell'utente loggato. Questo userID viene usato per l'interazione col DB e *
  certifica l'auth                                                                    *
  *************************************************************************************/

  constructor(
    protected orderService: OrderService,
    protected router: Router
  ) { }

  userOrder: Order = new Order();

  addProductToOrder(prod: Product): void {
    this.userOrder.items.push(prod);

  }

  removeProductFromOrder(prod: Product): void {
    // "deleted" evita errori di sincronizzazione client/server nel caso in cui il server non confermi la cancellazione dell'oggetto
    let deleted = false;
    const body = JSON.stringify({
      id: prod.id
    });
    this.orderService.removeProductFromOrderStateful(body).subscribe(
      (resp) => {
        if (resp.body === true) {
          console.log('product with ID: ' + prod.id + ' removed');
          deleted = true;
        } else {
        }
      }
    );
    if (true) {
      let itemDeleted = false; // per eliminare un solo oggetto per ogni tipo - bruttino ma passabile penso
      for (let i = 0; i < this.userOrder.items.length; i++) {
        if (this.userOrder.items[i].id === prod.id && itemDeleted === false) {
          this.userOrder.items.splice(i, 1);
          itemDeleted = true;
        }
      }
    }
  }

  completeOrder(): void {
  this.orderService.completeOrderStateful().subscribe(
    (resp) => {
      if (!isNullOrUndefined(resp)) {
        this.router.navigate(['app-home']);
      }
    });
  }

  ngOnInit() {
    this.orderService.getOrderStateful().subscribe(
      ((resp: HttpResponse<Order>) => {
        if (resp !== null) {
          this.userOrder = resp.body;
        }
      })
    );
  }

}
