import { Component } from '@angular/core';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  showImg = true;

  constructor(
    private filesService: FilesService
  ){}

  onLoaded(event: string) {
    console.log('Log padre ', event);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  downloadPdf() {
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
    .subscribe()
  }
}
