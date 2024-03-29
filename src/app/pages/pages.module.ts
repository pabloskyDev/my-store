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
import { ProductFormComponent } from './dashboard/product-form/product-form.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductCartComponent } from './shopping-cart/product-cart/product-cart.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CategoryComponent } from './category/category.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryComponent } from './recovery/recovery.component';


@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    ProductFormComponent,
    ShoppingCartComponent,
    HomeComponent,
    NotFoundComponent,
    CategoryComponent,
    MyCartComponent,
    RegisterComponent,
    RecoveryComponent
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
    ProductDetailComponent,
    ProductCartComponent
  ]
})
export class PagesModule { }
