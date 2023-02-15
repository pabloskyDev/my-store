import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category, CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { FilesService } from 'src/app/services/files.service';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  formProduct = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: [''],
    images: [{value: [''], disabled: true }, Validators.required],
    price: [0],
    categoryId: [0]
  })
  categories: Category[] = [];
  optionsImg: string[] = ['movie','game','book','fashion','furniture'];
  imagesA: string[] = [];
  imgRoute = 'https://api.lorem.space/image/';
  paramsImg = '?w=640&amp;amp;amp;amp;h=480';

  // Edit
  product!: Product;
  nameTitle!: string;
  nameBtn!: string;
  isUpdate = false;

  // Todo this is for Create product
  // imgRta = '';
  // showImg = true;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private filesService: FilesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.getCategories();
  }

  getParams() {
    this.route.params.subscribe((params) => {
      if(params['id']) {
        this.findProduct(params['id']);
        this.nameTitle = 'Edit';
        this.nameBtn = 'Save';
        this.isUpdate = true;
      }else {
        this.nameTitle = 'Create';
        this.nameBtn = 'Create';
        this.habilitateForm();
      }
    })
  }

  getCategories() {
    this.productsService.getCategory().subscribe({
      next: (res) => {
        this.categories = res;
      }
    })
  }

  findProduct(id: string) {
    this.productsService.getProduct(id).subscribe({
      next: (res) => {
        this.product = res;
        this.setFormValues(this.product);
      },
      error: () => {
        Swal.fire( '¡Cancelado!', 'Tu producto no se pudo encontrar', 'error').then(() => {
          this.goHome();
        })
      }
    })
  }

  setFormValues(product: Product) {
    this.formProduct.patchValue({
      title: product.title,
      description: product.description,
      images: product.images,
      price: product.price,
      categoryId: parseInt(product.category.id)
    })
  }

  habilitateForm() {
    this.formProduct.controls.images.enable();
  }

  onSubmit() {
    this.formProduct.markAllAsTouched();
    if (this.formProduct.invalid) return

    if(this.isUpdate) {
      this.updateProduct();
    }else {
      this.createProduct();
    }
  }

  createProduct() {
    this.imagesA.push(`${this.imgRoute}${this.formProduct.getRawValue().images}${this.paramsImg}`);

    const product: CreateProductDTO = {
      ...this.formProduct.getRawValue(),
      images: this.imagesA
    }
    this.productsService.create(product);
  }

  updateProduct() {
    const changes: UpdateProductDTO = this.formProduct.getRawValue();
    const id = this.product.id;

    this.productsService.update(id, changes);
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
