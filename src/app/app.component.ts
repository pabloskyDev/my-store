import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  onLoaded(event: string) {
    console.log('Log padre ', event);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }
}
