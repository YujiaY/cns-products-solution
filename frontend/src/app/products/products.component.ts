import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ViewChild,
} from "@angular/core";
import {
  ProductsService,
  PaginatedResult,
  PaginationParams,
} from "./services/products.service";
import { Product } from "./types/product-types";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import {
  BehaviorSubject,
  combineLatest,
  map,
  startWith,
  tap,
  catchError,
  of,
} from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"],
})
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = [
    "product_id",
    "name",
    "brand",
    "product_category",
  ];
  dataSource = new MatTableDataSource<Product>([]);

  totalRecords = 0;
  pageSize = 20;
  pageIndex = 0; // zero-based for Angular Material
  pageSizeOptions = [5, 10, 20, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Loading and error handling can be managed via combining streams
  private loadingSubject = new BehaviorSubject<boolean>(true);
  private errorSubject = new BehaviorSubject<string>("");
  isLoading$ = this.loadingSubject.asObservable();
  errorMessage$ = this.errorSubject.asObservable();

  // Combine products$ from the service with loading and error states
  products$ = this.productsService.products$.pipe(
    tap(() => {
      this.loadingSubject.next(false);
      this.errorSubject.next("");
    }),
    catchError((error) => {
      console.error("Error fetching products:", error);
      this.loadingSubject.next(false);
      this.errorSubject.next(error.message);
      // Return fallback value so stream continues
      return of({
        data: [],
        pagination: {
          totalRecords: 0,
          totalPages: 0,
          currentPage: 1,
          pageSize: this.pageSize,
        },
      });
    }),
    tap((result) => {
      const { data, pagination } = result;
      this.dataSource.data = data;
      this.totalRecords = pagination.totalRecords;
      this.pageSize = pagination.pageSize;
      this.pageIndex = pagination.currentPage - 1; // Convert to zero-based index
    }),
  );

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // Initial load
    this.productsService.updatePaginationParams({
      page: 1,
      pageSize: this.pageSize,
    });
  }

  onPageChange(event: PageEvent) {
    this.loadingSubject.next(true);
    this.errorSubject.next("");
    // Convert the zero-based pageIndex from Angular Material to 1-based for the API
    const page = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.productsService.updatePaginationParams({ page, pageSize });
  }
}
