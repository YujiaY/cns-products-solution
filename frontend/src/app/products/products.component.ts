import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import {
  PaginatedResult,
  PaginationParams,
  ProductsService,
} from "./services/products.service";
import { Product } from "./types/product-types";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { Subject, catchError, finalize, takeUntil, throwError } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    "product_id",
    "name",
    "brand",
    "product_category",
  ];
  dataSource = new MatTableDataSource<Product>([]);
  isLoading: boolean = true;
  errorMessage: string = "";

  // Store pagination details locally
  totalRecords = 0;
  pageSize = 20;
  pageIndex = 0; // zero-based for Angular Material
  pageSizeOptions = [5, 10, 20, 50];

  private destroy$ = new Subject<void>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchProducts({ page: 1, pageSize: this.pageSize });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   *  Fetches products from the ProductsService and updates pagination.
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
      .subscribe((result: PaginatedResult<Product>) => {
        // console.log("productsService.getProducts.result", result);
        const { data, pagination } = result;

        this.dataSource.data = data;
        console.log("productsService.  pagination", pagination);

        // Update paginator properties to reflect server-side data
        this.totalRecords = pagination.totalRecords;
        this.pageSize = pagination.pageSize;
        // Note: currentPage is 1-based from server, convert to 0-based for Angular Material
        this.pageIndex = pagination.currentPage - 1;

        if (this.paginator) {
          // console.log("this.paginator", this.paginator);
          this.paginator.length = this.totalRecords;
          this.paginator.pageSize = this.pageSize;
          this.paginator.pageIndex = this.pageIndex;
        }

        // this.dataSource.paginator = this.paginator;
      });
  }

  /**
   * Handles page changes from the MatPaginator.
   * Called when user clicks on a different page or changes page size.
   */
  onPageChange(event: PageEvent) {
    // Convert the zero-based pageIndex from Angular Material to 1-based for the API
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;

    this.fetchProducts({ page, pageSize });
  }
}
