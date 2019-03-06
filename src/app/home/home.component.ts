import { Component, OnInit } from '@angular/core';
import { Product } from '../model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  products = ['prod1', 'prod2', 'prod3', 'prod4'];

  ngOnInit() {
  }

  addToOrder(prod: Product): void {

  }

}
