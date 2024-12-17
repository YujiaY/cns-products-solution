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
    const todayUTC = new Date(
      Date.UTC(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        new Date().getUTCDate(),
        0,
        0,
        0,
        0,
      ),
    );

    // Use source dates if available, otherwise use calculated dates
    const effective_from =
      incomingProduct.effectiveFrom || todayUTC.toISOString();

    const effective_to =
      incomingProduct.effectiveTo ||
      new Date(todayUTC.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString();

    return {
      product_id: incomingProduct.productId,
      effective_from,
      effective_to,
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
      name: incomingDetail.name,
      description: incomingDetail.description,

      features: [...(incomingDetail.features ?? [])],
      eligibility: [...(incomingDetail.eligibility ?? [])],
      fees: [...(incomingDetail.fees ?? [])],
    };
  }
}
