import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, CreateProductDTO, Product } from 'src/app/models/product.model';
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
    price: [0],
    categoryId: [0]
  })
  categories: Category[] = [];
  optionsImg: string[] = ['movie','game','book','fashion','furniture'];
  imagesA: string[] = [];
  imgRoute = 'https://api.lorem.space/image/';
  paramsImg = '?w=640&amp;amp;amp;amp;h=480';

  // Todo this is for Create product
  // imgRta = '';
  // showImg = true;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private filesService: FilesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.productsService.getCategory().subscribe({
      next: (res) => {
        this.categories = res;
      }
    })
  }

  onSubmit() {
    this.formProduct.markAllAsTouched();
    if (this.formProduct.invalid) return

    this.createProduct();
  }

  createProduct() {
    this.imagesA.push(`${this.imgRoute}${this.formProduct.getRawValue().images}${this.paramsImg}`);

    const product: CreateProductDTO = {
      ...this.formProduct.getRawValue(),
      images: this.imagesA
    }
    this.productsService.create(product);
  }

  goHome() {
    this.router.navigate(['']);
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
