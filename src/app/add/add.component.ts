import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Product } from '../models/product';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  product: Product;
  constructor(private productService: ProductApiService, private router: Router){
    this.product = new Product();
  }

  ngOnInit(){
    
  }

  AddProduct(form: NgForm){
    if(form.valid){
      this.product.productId = "0";
      this.product.categoryId = 1;
      console.log(this.product);
      
      this.productService.AddProduct(this.product).subscribe({
        next: (res)  => {
          if(res.status === 200){
            this.router.navigate(['/view']);
          }
        },
        error: error => {
          console.error('Error adding product:', error);
        },
        complete: () => {
          console.log('Product added.');
        },
      });
    }
  }

}

