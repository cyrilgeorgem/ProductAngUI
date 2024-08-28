import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../services/product-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  product: Product;
  constructor(private productService: ProductApiService, private router: Router, private route: ActivatedRoute){
    this.product = new Product();
  }

  ngOnInit(){
    this.route.params.subscribe(
      params => {
        let id = params['id'];
        console.log("Params" + id);
        if(id !== undefined){
          /* this.productService.GetProductById(id).subscribe(
            res => {
              console.log("Get product: " + res);
              this.product = res;
            },
            error => {
              console.error('Error fetching product:', error);
            }
          ) */

          this.productService.GetProductById(id).subscribe({
            next: (res)  => {
              console.log("Get product: " + res);
              this.product = res;
            },
            error: error => {
              console.error('Error fetching product:', error);
            },
            complete: () => {
              console.log('Product details received.');
            },
          });

        }
      }
    )
  }

  UpdateProduct(form: NgForm){
    if(form.valid){
      this.product.categoryId = 1;
      console.log(this.product);
      this.productService.UpdateProduct(this.product).subscribe({
        next: (res)  => {
          if(res.status === 200){
            console.log("Inside If Status Code: " + res.status);
            this.router.navigate(['/view']);
          }
        },
        error: error => {
          console.error('Error updating product:', error);
        },
        complete: () => {
          console.log('Product updated.');
        },
      });
      
    }
  }

}
