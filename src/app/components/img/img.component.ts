import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit {

  @Input() img: string = '';
  // Tal cual el evento es puesto aquí, es escuchado en el evento padre.
  @Output() loaded = new EventEmitter<string>();
  imageDefault = '../assets/images/default.png';
  /**
   * Test images
   * https://www.m2crowd.com/core/i/placeholder.png
   * https://www.w3schools.com/howto/img_avatar.png
  */

  constructor() { }

  ngOnInit(): void {
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('Log hijo');
    // De esta forma el componente está siendo escuchado por el padre.
    this.loaded.emit(this.img);
  }

}
