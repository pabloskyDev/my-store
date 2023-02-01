import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  searchProducts = this.fb.nonNullable.group({
    search: ['']
  });

  imgRta = '';
  imgParent = '';
  showImg = true;

  constructor(
    private filesService: FilesService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const valSearch = this.searchProducts.getRawValue().search;
    // TODO create a filterPipe and set limit and offset
    if(valSearch) {
      console.log(valSearch);
    }
  }

  // Todo change the location of this codes
  onLoaded(event: string) {}

  // toggleImg() {
  //   this.showImg = !this.showImg;
  // }

  // downloadPdf() {
  //   this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf', 'application/pdf')
  //   .subscribe()
  // }

  // onUpload(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   const file = element.files?.item(0) as Blob;
  //   if(file) {
  //     this.filesService.uploadFile(file)
  //     .subscribe(rta => {
  //       this.imgRta = rta.location
  //     })
  //   }
  // }

}
