import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  // Permite inicializar componente
  @Input() product: Product = {
    id: '',
    name: '',
    price: 0,
    image: ''
  }
  @Output() addedProduct = new EventEmitter<Product>();

  // Otra forma de inicializar clave-valor de objeto producto
  // @Input('product') product!: Product;

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart() {
    this.addedProduct.emit(this.product);
  }

}
