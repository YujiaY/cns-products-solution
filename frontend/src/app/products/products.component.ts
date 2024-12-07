import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { PaginationParams, ProductsService } from "./services/products.service";
import { Product } from "./types/product-types";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { Subject, catchError, finalize, takeUntil, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ["name", "brand", "product_category"];
  dataSource = new MatTableDataSource<Product>([]);
  isLoading: boolean = true;
  errorMessage: string = "";

  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts({ page: 1, pageSize: 20 });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Fetches products from the ProductsService.
   */
  fetchProducts(params?: PaginationParams): void {
    this.isLoading = true;
    this.errorMessage = "";

    this.productsService
      .getProducts(params)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: HttpErrorResponse) => {
          console.error("Error fetching products:", error);
          this.errorMessage = error.message;
          return throwError(() => error);
        }),
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((data) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
      });
  }
}
