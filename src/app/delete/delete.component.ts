import { Component } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Product } from '../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent {
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

  DeleteProduct(form: NgForm){
    if(confirm('Do you want to delete?')){
      if(form.valid){
        let id = this.product.productId;
        console.log(this.product);

        this.productService.DeleteProduct(id).subscribe({
          next: (res)  => {
            console.log("Status Code: " + res.status);
            if(res.status === 200){
              console.log("Inside If Status Code: " + res.status);
              this.router.navigate(['/view']);
            }
          },
          error: error => {
            console.error('Error deleting product:', error);
          },
          complete: () => {
            console.log('Product deleted.');
          },
        });
        
      }
    }
  }

}
