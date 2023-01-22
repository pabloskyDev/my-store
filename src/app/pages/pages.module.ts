import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../components/header/header.component';
import { ProductComponent } from './product-list/product/product.component';
import { SwiperModule } from 'swiper/angular';
import { ImgComponent } from '../components/img/img.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ProductListComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HeaderComponent,
    ProductComponent,
    SwiperModule,
    ImgComponent
  ]
})
export class PagesModule { }
