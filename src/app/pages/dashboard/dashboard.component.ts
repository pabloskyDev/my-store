import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
import { FilesService } from 'src/app/services/files.service';
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

  // Todo this is for Create product
  // imgRta = '';
  // imgParent = '';
  // showImg = true;

  constructor(
    // private filesService: FilesService,
    private fb: FormBuilder,
    private storeService: StoreService,
    private productsService: ProductsService
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
        // console.log(this.productChosen);
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

  toggleProductDetail(show: any) {
    this.showProductDetail = show;
  }

  addNewProduct() {
    console.log('Product added!!');
    // this.createNewProduct();
  }
  // Todo: Create component with form to create products

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

  onSubmit() {
    const valSearch = this.searchProducts.getRawValue().search;
    // TODO create a filterPipe and set limit and offset
    if(valSearch) {
      console.log(valSearch);
    }
  }

  // Todo change the location of this codes (Create new Product component)
  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }

  // downloadPdf() {
  //   this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
  //   .subscribe()
  // }

  // onUpload(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   const file = element.files?.item(0) as Blob;
  //   if(file) {
  //     this.filesService.uploadFile(file)
  //     .subscribe(rta => {
  //       this.imgRta = rta.location
  //     })
  //   }
  // }

}
