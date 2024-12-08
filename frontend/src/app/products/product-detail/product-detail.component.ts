import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  Observable,
  Subject,
  catchError,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  finalize,
} from "rxjs";
import { ProductsService } from "../services/products.service";
import { ProductDetail } from "../types/product-types";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styles: [
    `
      .loading-container {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 1rem 0;
      }
      .error-message {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: red;
        p {
          margin: 12px 0;
        }
      }
    `,
  ],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  error: string | null = null;
  isLoading = true;
  private destroy$ = new Subject<void>();

  productDetail$: Observable<ProductDetail | null>;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
  ) {}

  ngOnInit(): void {
    this.isLoading = true;

    this.productDetail$ = this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map((params) => params.get("id")),
      switchMap((id) => {
        if (!id) {
          this.error = "No product ID provided";
          this.isLoading = false;
          return of(null);
        }

        return this.productsService.getProductDetail(id).pipe(
          tap({
            next: (response) => {
              if (!response) {
                this.error = "No product found";
              }
            },
            error: (error: HttpErrorResponse) => {
              console.error("Error fetching product details:", error);
              this.error =
                error.statusText ||
                error.message ||
                "An error occurred while fetching the product";
            },
          }),
          catchError(() => {
            this.isLoading = false;
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          }),
        );
      }),
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
