import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {
  private apiAddress = 'https://localhost:7033/api';
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) { 
    this.headers = new HttpHeaders({'content-type': 'application/json'});
  }

  GetProductList(): Observable<Product[]>{
    console.log("Api address: " + this.apiAddress);
    return this.httpClient.get<Product[]>(this.apiAddress + '/Product/GetAllProducts');
  }

  GetProductById(id: string): Observable<Product>{
    console.log("Api address: " + this.apiAddress);
    return this.httpClient.get<Product>(this.apiAddress + '/Product/GetProductById/' + id);
  }

  AddProduct(product: Product): Observable<HttpResponse<any>>{    
    return this.httpClient.post(this.apiAddress + '/Product/AddNewProduct', JSON.stringify(product), 
    {
      headers: this.headers,
      observe:'response'
    }).pipe(
      catchError((error: any) => {
        console.error('Error in AddProduct:', error);
        throw error;
      })
    );

  }

  UpdateProduct(product: Product): Observable<HttpResponse<any>>{    
    return this.httpClient.put(this.apiAddress + '/Product/UpdateProduct', JSON.stringify(product), 
    {
      headers: this.headers,
      observe:'response'
    }).pipe(
      catchError((error: any) => {
        console.error('Error in AddProduct:', error);
        throw error;
      })
    );
  }
  
  DeleteProduct(id: string): Observable<HttpResponse<any>>{
    console.log("Api address: " + this.apiAddress + '/Product/DeleteProduct/' + id);
    
    return this.httpClient.delete<HttpResponse<any>>(this.apiAddress + '/Product/DeleteProduct/' + id, 
      { observe: 'response' });    
  }
  
}

