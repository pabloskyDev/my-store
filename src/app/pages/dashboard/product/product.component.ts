import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ImgComponent } from 'src/app/components/img/img.component';

import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ CommonModule, ImgComponent ],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product!: Product;
  @Input() idProduct!: string;
  @Output() addedProduct = new EventEmitter<Product>();
  @Output() showProduct = new EventEmitter<string>();
  activeProduct = false;

  onAddToCart() {
    this.addedProduct.emit(this.product);
    this.activeProduct = !this.activeProduct;
  }

  onShowDetail() {
    this.showProduct.emit(this.product.id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes["idProduct"].currentValue) {
      if(changes["idProduct"].currentValue === this.product.id) {
        this.activeProduct = false;
      }
    }
  }
}
