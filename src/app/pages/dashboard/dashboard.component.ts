import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { StoreService } from 'src/app/services/store.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchProducts = this.fb.nonNullable.group({
    search: ['']
  });
  total = 0;
  products: Product[] = []

  showProductDetail = false;
  productChosen!: Product;
  limit = 10;
  offset = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  page!: any;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
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

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.productsService.getProduct(id)
    .subscribe({
      next: (data) => {
        this.toggleProductDetail(true);
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

  toggleProductDetail(show: boolean) {
    this.showProductDetail = show;
  }

  deleteArrayProduct(id: string) {
    if(id) {
      let product = this.products.filter(product => product.id === id);
      let index = this.products.indexOf(product[0])
      this.products.splice(index, 1);
    }
  }

  addNewProduct() {
    console.log('Product added!!');
    this.router.navigate(['/form']);
  }

  onSubmit() {
    const valSearch = this.searchProducts.getRawValue().search;
    // TODO create a filterPipe and set limit and offset
    if(valSearch) {
      console.log(valSearch);
    }
  }
}
