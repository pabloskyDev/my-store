import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = 'Pablo';
  age = 18;
  img = 'https://nightsky.jpl.nasa.gov/images/news/HDP_896.jpg';
  btnDisabled: boolean = true;

  person = {
    nameP: "Juan",
    ageP: 22,
    avatar: 'https://nightsky.jpl.nasa.gov/images/news/HDP_896.jpg'
  }

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
}
