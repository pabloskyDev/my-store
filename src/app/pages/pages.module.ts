import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../components/header/header.component';
import { ProductComponent } from './dashboard/product/product.component';
import { SwiperModule } from 'swiper/angular';
import { ImgComponent } from '../components/img/img.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../components/input/input.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductDetailComponent } from './dashboard/product-detail/product-detail.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HeaderComponent,
    ProductComponent,
    SwiperModule,
    ImgComponent,
    ReactiveFormsModule,
    InputComponent,
    NgxPaginationModule,
    ProductDetailComponent
  ]
})
export class PagesModule { }
