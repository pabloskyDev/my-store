import { Component } from '@angular/core';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  widthImg = 10;
  name = 'Pablo';
  age = 18;
  img = 'https://nightsky.jpl.nasa.gov/images/news/HDP_896.jpg';
  btnDisabled: boolean = true;

  person = {
    nameP: "Juan",
    ageP: 22,
    avatar: 'https://nightsky.jpl.nasa.gov/images/news/HDP_896.jpg'
  }

  names: (string | number)[] = ["juan", "nicolas", "pablo", "elijah", "ana"];
  newName: string = '';
  box = {
    width: 100,
    height: 100,
    background: '#f00'
  }

  products: Product[] = [
    {
      name: 'EL mejor juguete',
      price: 565,
      image: './assets/images/jellyfish_right.jpg',
      category: 'all'
    },
    {
      name: 'Bicicleta casi nueva',
      price: 356,
      image: './assets/images/macaw.jpg'
    },
    {
      name: 'Colleción de albumnes',
      price: 34,
      image: './assets/images/medusitas.jpg'
    },
    {
      name: 'Mis libros',
      price: 23,
      image: './assets/images/red_moon.jpg'
    },
    {
      name: 'Casa para perro',
      price: 34,
      image: './assets/images/universe.jpg'
    },
    {
      name: 'Gafas',
      price: 3434,
      image: './assets/images/window.jpg'
    }
  ]
  // Método
  toggleButton() {
    this.btnDisabled = !this.btnDisabled;
  }

  increaseAge() {
    this.person.ageP += 1;
  }

  onScroll(event: Event) {
    const element = event.target as HTMLElement;
    console.log(element.scrollTop);
  }

  changeName(event: Event) {
    const element = event.target as HTMLInputElement;
    this.person.nameP = element.value;
  }

  addName() {
    this.names.push(this.newName);
    this.newName = '';
  }

  deleteName(index: number) {
    this.names.splice(index, 1);
  }
}
