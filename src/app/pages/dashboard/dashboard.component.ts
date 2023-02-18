import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, Product } from 'src/app/models/product.model';
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
  product!: Product;
  productLength = 0;

  showProductDetail = false;
  productChosen!: Product;
  limit = 10; limitC = 10;
  offset = 0; offsetC = 0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';
  page!: any;
  categoryLength = 0;
  idCategory = '';
  categories: Category[] = [];
  activeDefault = false;

  constructor(
    private fb: FormBuilder,
    private storeService: StoreService,
    private productsService: ProductsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProductAdded();
    this.getProducts();
  }

  getCategories() {
    this.productsService.getCategory().subscribe({
      next: (res) => {
        this.categories = res;
        // console.log(this.categories);
      }
    })
  }

  getProductAdded() {
    this.product = this.productsService.getNewProduct();
    if(this.product) {
      this.products.unshift(this.product);
    }
  }

  getProducts() {
    this.activeDefault = true;
    if(this.idCategory) {
      this.idCategory = '';
    }
    this.productsService.getProductsByPage(this.limit, this.offset)
    .subscribe({
      next: (data) => {
        this.productLength = data.length;
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

  getProductCategory(id?: string) {
    if(id) {
      this.activeDefault = false;
      this.offsetC = 0;
      this.products = [];
      this.idCategory = id;
    }
    if(this.idCategory) {
      // console.log(this.limitC + ' - ' + this.offsetC);
      this.productsService.getProductsByCategory(this.idCategory, this.limitC, this.offsetC).subscribe({
        next: (data) => {
          this.categoryLength = data.length;
          this.products = [...this.products, ...data];
          this.offsetC += this.limitC;
        }
      })
    }
  }

  reload() {
    location.reload();
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
    console.log(this.total);
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
