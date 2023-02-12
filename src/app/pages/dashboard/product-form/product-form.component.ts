import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CreateProductDTO, Product } from 'src/app/models/product.model';
import { FilesService } from 'src/app/services/files.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  formProduct = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    images: [[''], Validators.required],
    price: [''],
    categoryId: []
  })
  products: Product[] = [];

  // Todo this is for Create product
  // imgRta = '';
  // imgParent = '';
  // showImg = true;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private filesService: FilesService
  ) { }

  ngOnInit(): void {
    console.log('Si llega al componente');
  }

  onSubmit() {
    this.formProduct.markAllAsTouched();
    if (this.formProduct.invalid) return
    this.createNewProduct();
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
