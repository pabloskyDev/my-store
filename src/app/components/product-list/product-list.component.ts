import { Component, OnInit } from '@angular/core';
import { Product, CreateProductDTO, UpdateProductDTO } from '../../models/product.model';
import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service'
import Swal from 'sweetalert2'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = []
  showProductDetail = false;
  productChosen: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  }
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    // Inyección de dependencias
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    // this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
    this.loadMore();
  }

  onAddToShoppingCart(product: Product){
    this.storeService
    .addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService
    .getProduct(id)
    .subscribe({
      next: (data) => {
        this.toggleProductDetail();
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      error: (errorMsg) => {
        this.statusDetail = 'error';
        Swal.fire({
          title: 'Error!',
          text: errorMsg,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    });
  }

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
      this.showProductDetail = false;
    });
  }

  loadMore() {
    this.productsService
    .getProductsByPage(this.limit, this.offset)
    .subscribe({
      next: (data) => {
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
    });
  }
}
