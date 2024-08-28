import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserLogin } from '../models/userlogin';
import { LoginApiService } from '../services/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userLogin: UserLogin;
  constructor(private loginService: LoginApiService, private router: Router, private route: ActivatedRoute){
    this.userLogin = new UserLogin();
  }

  CheckUserLogin(form: NgForm){
    if(form.valid){
      this.loginService.CheckUserLogin(this.userLogin).subscribe({
        next: (res)  => {
          if(res.status === 200){
            console.log("Inside If Status Code: " + res.status);
            this.router.navigate(['/home']);
          }
        },
        error: error => {
          console.error('Error in login:', error);
        },
        complete: () => {
          console.log('Login success.');
        },
      });
      
    }
  }

}
