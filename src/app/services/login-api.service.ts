import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { UserLogin } from '../models/userlogin';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService {
  private apiAddress = 'https://localhost:7033/api';
  headers: HttpHeaders;
  constructor(private httpClient: HttpClient) { 
    this.headers = new HttpHeaders({'content-type': 'application/json'});
  }

  CheckUserLogin(userLogin: UserLogin): Observable<HttpResponse<any>>{    
    return this.httpClient.post(this.apiAddress + '/Login/CheckUserLogin', JSON.stringify(userLogin), 
    {
      headers: this.headers,
      observe:'response'
    }).pipe(
      catchError((error: any) => {
        console.error('Error in Login:', error);
        throw error;
      })
    );

  }

}
