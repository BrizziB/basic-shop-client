import { Component, OnInit } from '@angular/core';
import { Order } from '../../model/Order';
import { Product } from '../../model/Product';
import { HttpResponse } from '@angular/common/http';
import { LocalComponentsService } from '../../services/local/local.components.service';
import { OrderService } from '../../services/order.service';
import { User } from '../../model/User';
import { AuthGuardService } from '../../services/auth-guard.service';
import { isNullOrUndefined } from 'util';
import { AppRoutingModule } from '../../app-routing.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(
    protected localComponentsService: LocalComponentsService,
    protected orderService: OrderService,
    protected authService: AuthGuardService,
    protected router: Router
  ) { }

  userOrder: Order = new Order();
  user: User;

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
    this.user = this.authService.getLoggedUser();
    this.orderService.getOrderStateful().subscribe(
      ((resp: HttpResponse<Order>) => {
        if (resp !== null) {
          this.userOrder = resp.body;
        }
      })
    );
  }

}
