import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product, UpdateProductDTO } from 'src/app/models/product.model';
import { SwiperModule } from 'swiper/angular';
import { ProductsService } from 'src/app/services/products.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
    private productsService: ProductsService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  toggleDetail() {
    this.showDetail.emit(false);
  }

  update() {
    this.router.navigate(['form/', this.product.id]);
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro de eliminar este producto?',
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
    })
  }

  deleteProduct(id: string) {
    this.productsService.delete(id).subscribe({
      next: () => {
        Swal.fire( '¡Eliminado!',
        'Tu producto ha sido eliminado con éxito.', 'success')
        this.toggleDetail();
        this.productId.emit(this.product.id);
      },
      error: () => {
        Swal.fire( '¡Cancelado!', 'Tu producto no se pudo eliminar', 'error')
      }
    })
  }
}
