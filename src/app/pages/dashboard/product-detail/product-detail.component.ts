import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, UpdateProductDTO } from 'src/app/models/product.model';
import { SwiperModule } from 'swiper/angular';
import { ProductsService } from 'src/app/services/products.service';
import { switchMap } from 'rxjs/operators'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, SwiperModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  @Output() showDetail = new EventEmitter<boolean>();
  @Output() productId = new EventEmitter<string>();
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

  delete() {
    Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
      // text: 'Luego no podrás recuperar este producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'No, mantenerlo'
    }).then((result) => {
      if (result.value) {
        if(this.product.id) {
          this.deleteProduct(this.product.id);
        }
      }
      /*else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }*/
    })
  }

  deleteProduct(id: string) {
    this.productsService.delete(id).subscribe({
      next: (res) => {
        Swal.fire( '¡Eliminado!',
        'Tu producto ha sido eliminado con éxito.', 'success')
        this.toggleDetail();
        this.productId.emit(this.product.id);
      },
      error: (err) => {
        Swal.fire( '¡Cancelado!', 'Tu producto no se pudo eliminar', 'error')
      }
    })
  }
}
