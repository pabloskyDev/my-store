import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, UpdateProductDTO } from 'src/app/models/product.model';
import { SwiperModule } from 'swiper/angular';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, SwiperModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Output() showDetail = new EventEmitter<boolean>();
  @Input() product!: Product;
  @Input() status: 'loading' | 'success' | 'error' | 'init' = 'init';

  products: Product[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
  }

  toggleDetail() {
    this.showDetail.emit(false);
  }

  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Changes tittle',
    }
    const id = this.product.id;
    this.productsService
    .update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.product.id);
      this.products[productIndex] = data;
      this.product = data;
    })
  }

  deleteProduct() {
    const id = this.product.id;
    this.productsService
    .delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.product.id);
      this.products.splice(productIndex, 1);
      // this.showProductDetail = false;
    });
  }

  readAndUpdate(id: string) {
    // Respuestas que dependen unas de otras
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product) => this.productsService.update(product.id, {title: 'change'}))
    )
    .subscribe(data => {
      // console.log(data);
    })

    // Respuestas que no tienen dependencia
    this.productsService.fetchReadAndUpdate(id, {title: 'change'})
    .subscribe(response => {
      const read = response[0];
      const update = response[1];
    })
  }

}
