import { describe } from "@jest/globals";
import { getProducts, getProductDetails } from "../lib/products";

describe("Products E2E Tests", () => {
  describe("getProducts", () => {
    it("returns a promise", () => {
      const res = getProducts();
      expect(res).toBeInstanceOf(Promise);
    });

    it("has correct fields", async () => {
      const products = await getProducts();
      expect(products.length).toBeGreaterThan(0);

      const product = products[0];
      expect(product).toHaveProperty("product_id");
      expect(product).toHaveProperty("effective_from");
      expect(product).toHaveProperty("effective_to");
      expect(product).toHaveProperty("product_category");
      expect(product).toHaveProperty("name");
      expect(product).toHaveProperty("description");
      expect(product).toHaveProperty("brand");
    });

    it("handles pagination correctly", async () => {
      const pageSize = 5;
      const products = await getProducts({ page: 1, "page-size": pageSize });
      expect(products.length).toBeLessThanOrEqual(pageSize);
    });

    it("throws error for invalid page number", async () => {
      await expect(
        getProducts({ page: 9999, "page-size": 10 }),
      ).rejects.toThrow("Request failed with status code 422");
    });

    it("handles pagination within valid range", async () => {
      const pageSize = 5;
      const products = await getProducts({ page: 1, "page-size": pageSize });
      expect(products.length).toBeLessThanOrEqual(pageSize);
    });
  });

  describe("getProductDetails", () => {
    // Store a valid product ID from the first test to use in subsequent tests
    let validProductId: string;

    beforeAll(async () => {
      const products = await getProducts();
      validProductId = products[0].product_id;
    });

    it("returns a promise", () => {
      const res = getProductDetails(validProductId);
      expect(res).toBeInstanceOf(Promise);
    });

    it("has correct fields", async () => {
      const productDetails = await getProductDetails(validProductId);

      expect(productDetails).toHaveProperty("product_id");
      expect(productDetails).toHaveProperty("name");
      expect(productDetails).toHaveProperty("description");
      expect(productDetails).toHaveProperty("features");
      expect(productDetails).toHaveProperty("eligibility");
      expect(productDetails).toHaveProperty("fees");

      // Validate array fields
      expect(Array.isArray(productDetails.features)).toBe(true);
      expect(Array.isArray(productDetails.eligibility)).toBe(true);
      expect(Array.isArray(productDetails.fees)).toBe(true);
    });

    it("throws error for invalid product ID", async () => {
      await expect(getProductDetails("invalid-id")).rejects.toThrow(
        "Request failed with status code 404",
      );
    });

    it("throws error for empty product ID", async () => {
      await expect(getProductDetails("")).rejects.toThrow(
        "Request failed with status code 404",
      );
    });
  });
});
