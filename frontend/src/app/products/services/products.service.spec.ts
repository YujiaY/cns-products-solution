import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { ProductsService } from "./products.service";
import { Product } from "../types/product-types";

describe("ProductsService", () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should fetch products", () => {
    const mockProducts: Product[] = [
      {
        product_id: "1",
        name: "Test Product",
        brand: "Test Brand",
        product_category: "Test Category",
      } as Product,
    ];

    const mockResponse = {
      data: mockProducts,
    };

    service.getProducts().subscribe((response) => {
      expect(response.data).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${service["baseUrl"]}/products`);
    expect(req.request.method).toBe("GET");

    // Mock the response with X-Pagination header
    req.flush(mockProducts);
  });

  it("should handle pagination parameters", () => {
    service.getProducts({ page: 2, pageSize: 10 }).subscribe();

    const req = httpMock.expectOne(
      (req) =>
        req.url.includes("/products") &&
        req.params.get("page") === "2" &&
        req.params.get("page-size") === "10",
    );
    expect(req.request.method).toBe("GET");
  });

  it("should parse pagination headers correctly", () => {
    const mockPagination = {
      totalRecords: 100,
      totalPages: 5,
      currentPage: 1,
      pageSize: 20,
    };

    service.getProducts().subscribe((response) => {
      expect(response.pagination).toEqual(mockPagination);
    });

    const req = httpMock.expectOne((req) => req.url.includes("/products"));
    req.flush([], {
      headers: {
        "X-Pagination": JSON.stringify(mockPagination),
      },
    });
  });
});
