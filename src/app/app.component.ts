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
}
