import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { StoreService } from '../../services/store.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  myShoppingCart: Product[] = [];
  total = 0;
  products: Product[] = [
    {
      id: '1',
      name: 'Automóvil de juguete',
      price: 100,
      image: '../assets/images/jellyfish_right.jpg'
    },
    {
      id: '2',
      name: 'Muñeca de trapo',
      price: 180,
      image: '../assets/images/red_moon.jpg'
    },
    {
      id: '3',
      name: 'Pelota de futbol',
      price: 120,
      image: '../assets/images/universe.jpg'
    },
    {
      id: '4',
      name: 'Sonajeros',
      price: 120,
      image: '../assets/images/macaw.jpg'
    },
    {
      id: '5',
      name: 'Cocinita',
      price: 120,
      image: '../assets/images/medusitas.jpg'
    }
  ]

  constructor(
    // Inyección de dependencias
    private storeService: StoreService
  ) {
    this.myShoppingCart = this.storeService.getShoppingCart();
  }

  ngOnInit(): void {
  }

  onAddToShoppingCart(product: Product){
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }
}
