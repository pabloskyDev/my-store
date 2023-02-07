import { Component, OnInit } from '@angular/core';

import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';

import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'

import { switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  // Todo pass all this component to dashboard
  total = 0;
  products: Product[] = []
  showProductDetail = false;
  productChosen!: Product;
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  page!: any;

  constructor(
    // Inyección de dependencias
    private storeService: StoreService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    // this.getProducts();
  }

  /*getProducts() {
    this.productsService
    .getProductsByPage(this.limit, this.offset)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.products = [...this.products, ...data];
        this.offset += this.limit;
      },
      error: (errorMsg) => {
        Swal.fire({
          title: '¡Error!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });*/

  /*onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
    console.log(this.total);
  }*/

  // TODO Pass this alert to other parts
  /*onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    .subscribe({
      next: (data) => {
        this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      error: (errorMsg) => {
        this.statusDetail = 'error';
        console.log(errorMsg);
        Swal.fire({
          title: 'Error!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }*/

  // Todo create component CRUD Products
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

  // Todo pass this function to dashboard
  createNewProduct() {
    const product: CreateProductDTO = {
      title: 'Nuevo producto',
      description: 'Ejemplo',
      images: [`https://placeimg.com/640/480/any?random=$%7BMath.random()%7D`],
      price: 1000,
      categoryId: 1
    }
    this.productsService
    .create(product)
    .subscribe(data => {
      this.products.unshift(data);
    })
  }

  // Todo pass these functions to detail product
  updateProduct() {
    const changes: UpdateProductDTO = {
      title: 'Changes tittle',
    }
    const id = this.productChosen.id;
    this.productsService
    .update(id, changes)
    .subscribe(data => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products[productIndex] = data;
      this.productChosen = data;
    })
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService
    .delete(id)
    .subscribe(() => {
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
      this.products.splice(productIndex, 1);
      // this.showProductDetail = false;
    });
  }
}
