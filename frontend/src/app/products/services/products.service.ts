import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Product } from "../types/product-types";

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  // Public API endpoint to retrieve require data
  private baseUrl: string = "http://localhost:3000"; // TODO: set url in env
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient) {}

  public getProducts(params?: PaginationParams): Observable<Product[]> {
    const { page = 1, pageSize = 25 } = params || {};

    const result = this.http.get<Product[]>(this.baseUrl + "/products", {
      headers: this.headers,
      params: {
        page: page,
        "page-size": pageSize,
      },
    });
    return result;
  }
}
