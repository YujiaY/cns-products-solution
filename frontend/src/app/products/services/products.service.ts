import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // Public API endpoint to retrieve require data (provided headers need to be included in request)
  private url: string = 'https://api.commbank.com.au/public/cds-au/v1/banking/products';
  private headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json',  'x-v': '3' });

  constructor(private http: HttpClient) { }

  // code to make http request should be contained in here
  public getProducts(): Observable<any> {
   return of('placeholder return');
  }
}
