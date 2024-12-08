import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from "@angular/common/http";
import { Observable, catchError, map, throwError } from "rxjs";
import { Product, ProductDetail } from "../types/product-types";
import { environment } from "../../../environments/environment";

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginationInfo {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: PaginationInfo;
}
@Injectable({
  providedIn: "root",
})
export class ProductsService {
  // Public API endpoint to retrieve require data
  private baseUrl: string = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
  });

  constructor(private http: HttpClient) {}

  public getProducts(
    params?: PaginationParams,
  ): Observable<PaginatedResult<Product>> {
    const httpParams = new HttpParams({
      fromObject: {
        ...(params?.page && { page: params.page.toString() }),
        ...(params?.pageSize && { "page-size": params.pageSize.toString() }),
      },
    });

    return this.http
      .get<Product[]>(`${this.baseUrl}/products`, {
        headers: this.headers,
        observe: "response",
        params: httpParams,
      })
      .pipe(
        map((response: HttpResponse<Product[]>) =>
          this.processProductResponse(response),
        ),
        catchError((error) => {
          console.error("Error fetching products:", error);
          return throwError(() => error);
        }),
      );
  }

  private processProductResponse(
    response: HttpResponse<Product[]>,
  ): PaginatedResult<Product> {
    const products = response.body ?? [];
    const paginationHeader = response.headers.get("X-Pagination");

    let pagination: PaginationInfo = {
      totalRecords: 0,
      totalPages: 0,
      currentPage: 1,
      pageSize: 20,
    };

    if (paginationHeader) {
      try {
        const parsed = JSON.parse(paginationHeader);
        pagination = {
          totalRecords: parsed.totalRecords,
          totalPages: parsed.totalPages,
          currentPage: parsed.currentPage,
          pageSize: parsed.pageSize,
        };
      } catch (error) {
        console.error("Error parsing X-Pagination header:", error);
      }
    }

    return {
      data: products,
      pagination,
    };
  }

  public getProductDetail(productId: string): Observable<ProductDetail> {
    return this.http.get<ProductDetail>(
      `${this.baseUrl}/productDetails?productId=${productId}`,
      {
        headers: this.headers,
      },
    );
  }
}
