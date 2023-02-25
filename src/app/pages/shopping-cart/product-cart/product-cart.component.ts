import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent implements OnInit {

  @Input() product!: Product;
  imgUrl = '../../../../assets/images/bike.jpg';
  constructor() { }

  ngOnInit(): void {
    console.log(this.product);
  }

}
