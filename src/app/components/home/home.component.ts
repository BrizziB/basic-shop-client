import { Component, OnInit } from '@angular/core';
import { Product } from '../../model/Product';
import { ProductsService } from '../../services/product.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    protected productService: ProductsService
  ) { }

  products: Product[];

  ngOnInit() {
  this.productService.getProducts().subscribe(
    ((resp: HttpResponse<Product[]>) => {
      if (resp !== null) {
        this.products = resp.body;
      }
    })
  );
  }

  addToOrder(prod: Product): void {

  }

}
