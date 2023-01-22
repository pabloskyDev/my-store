import { CommonModule } from '@angular/common';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, OnDestroy, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  img: string = '';
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
  }
  @Input() alt: string = '';
  // Tal cual el evento es puesto aquí, es escuchado en el evento padre.
  @Output() loaded = new EventEmitter<string>();
  imageDefault = '../assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;
  /**
   * Test images
   * https://www.m2crowd.com/core/i/placeholder.png
   * https://www.w3schools.com/howto/img_avatar.png
  */

  constructor() {
    // Corre antes del render
    // No se deben correr cosas de forma asíncrona
    // Se corre una vez por componente
    // console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Corre antes y durante del render
    // Objetivo: Actualizar cambios en los inputs
    // Corre muchas veces
    // console.log('ngOnChanges', 'imgValue => ', this.img);
  }

  ngOnInit(): void {
    // Corre antes del render
    // Se pueden correr cosas asincronas, aqui se espera la respuesta del servidor
    // Solo se corre una vez
    // console.log('ngOnInit', 'imgValue => ', this.img);
    // this.counterFn = window.setInterval(() => {
    //   this.counter += 1;
    //   console.log('run counter')
    // }, 1000);
  }

  ngAfterViewInit(): void {
    // Corre después de que todo este renderizado
    // Se manejan los hijos
    // console.log('ngAfterViewInit');
  }

  ngOnDestroy(): void {
    // Eliminar el componente y se correo solo al eliminarlo
    // console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    // console.log('Log hijo');
    // De esta forma el componente está siendo escuchado por el padre.
    this.loaded.emit(this.img);
  }

}
