import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode, HttpHeaders } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { throwError, zip } from 'rxjs';

import { Product, CreateProductDTO, UpdateProductDTO, Category } from './../models/product.model';
import { checkTime } from '../interceptors/time.interceptor';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = `${environment.API_URL}/api/products`;
  product!: Product;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams();
    if(limit && offset){
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}`, { params, context: checkTime() })
    .pipe(
      retry(3),
      map(products => products.map(item => {
        return {
          ...item,
          taxes: .19 * item.price
        }
      }))
    );
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === HttpStatusCode.ServiceUnavailable){
          return throwError(() => 'Algo salió mal en el servidor');
        }
        if(error.status === HttpStatusCode.NotFound){
          return throwError(() => 'El producto no existe');
        }
        if(error.status === HttpStatusCode.Unauthorized){
          return throwError(() => 'No estás permitido');
        }
        return throwError(() => 'Algo salió mal');
      })
    )
  }

  getProductsByPage(limit: number, offset: number) {
    return this.http.get<Product[]>(`${this.apiUrl}`, {
      params: {limit, offset}
    });
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}`, dto).subscribe(data => {
      this.product = data;
      if(this.product) {
        this.router.navigate(['']);
      }
    })
  }

  update(id: string, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, dto).subscribe({
      next: (res) => {
        if(res) {
          this.router.navigate(['']);
        }
      },
      error: (err) => {
        console.log(err.error.message);
      }
    })
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

  getCategory() {
    return this.http.get<Category[]>(`${environment.API_URL}/api/categories`);
  }

  getProductsByCategory(id: string, limit: number, offset: number) {
    return this.http.get<Product[]>(`${environment.API_URL}/api/categories/${id}/products`, {
      params: {limit, offset}
    })
  }

  getNewProduct() {
    return this.product;
  }
}
