import {
  IncomingProduct,
  IncomingProductDetail,
  Product,
  ProductDetail,
} from "../types/productTypes";

export class ProductTransformer {
  /**
   * Converts an IncomingProduct into a Product.
   * @param incomingProduct The IncomingProduct object to transform.
   * @returns A Product object with the required properties.
   */
  static toProduct(incomingProduct: IncomingProduct): Product {
    return {
      product_id: incomingProduct.productId,
      effective_from: incomingProduct.effectiveFrom || "",
      effective_to: incomingProduct.effectiveTo || "",
      product_category: incomingProduct.productCategory,
      name: incomingProduct.name,
      description: incomingProduct.description,
      brand: incomingProduct.brand,
    };
  }

  /**
   * Converts an IncomingProductDetail into ProductDetail.
   * @param incomingDetail The IncomingProductDetail object to transform.
   * @returns A ProductDetail object with the required properties.
   */
  static toProductDetail(incomingDetail: IncomingProductDetail): ProductDetail {
    return {
      product_id: incomingDetail.productId,
      features: [...incomingDetail.features],
      eligibility: [...incomingDetail.eligibility],
      fees: [...incomingDetail.fees],
    };
  }
}
