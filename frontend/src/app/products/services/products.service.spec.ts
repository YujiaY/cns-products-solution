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
});
