import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  public productList: Product[] = [];
  constructor(private productApiService: ProductApiService) {}

  ngOnInit(){
    this.GetProductList();
  }

  GetProductList(){
    this.productApiService.GetProductList().subscribe({
      next: (res: Product[])  => {
        console.log(res);
        this.productList = res;
      },
      error: error => {
        console.error('Error fetching product list:', error);
      },
      complete: () => {
        console.log('Product list received.');
      },
    });
  }

}
