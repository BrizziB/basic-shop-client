import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ProductsService } from '../../services/product.service';
import { HttpResponse } from '@angular/common/http';
import { LocalComponentsService } from '../../services/local/local.components.service';
import { OrderService } from '../../services/order.service';
import { AuthGuardService } from '../../services/auth-guard.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    protected productService: ProductsService,
    protected orderService: OrderService,
    protected localComponentService: LocalComponentsService,
    protected authService: AuthGuardService
  ) { }

  products: Product[];
  user: User;

  ngOnInit() {
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
