import { Component } from '@angular/core';
import { Product } from './models/product.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  products: Product[] = [
    {
      id: '1',
      name: 'Automobil de juguete',
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
    }
  ]

  onLoaded(event: string) {
    console.log('Log padre ', event);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
