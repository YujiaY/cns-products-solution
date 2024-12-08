import axios from "axios";
import { environment } from "../config/environment";
import {
  IncomingProduct,
  IncomingProductDetail,
  Product,
  ProductDetail,
} from "../types/productTypes";
import { ProductTransformer } from "../helpers/ProductTypesMapper";

interface PaginationQueryParams {
  page?: number;
  "page-size"?: number;
}

export interface IncomingPaginationMetaData {
  totalRecords?: number;
  totalPages?: number;
}

export interface IncomingProductResponseType {
  data: {
    products: IncomingProduct[];
  };
  links: {
    self: string;
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
  };
  meta: IncomingPaginationMetaData;
}

interface IncomingProductDetailResponseType {
  data: IncomingProductDetail;
  links: {
    self: string;
    first?: string;
    prev?: string;
    next?: string;
    last?: string;
  };
}

/**
 * This function retrieves the product data with pagination support
 * @param params - pagination parameters (page and pageSize)
 * @returns Promise<Product[]>
 */
export async function getProducts(
  params?: PaginationQueryParams,
): Promise<Product[]> {
  const { page = 1, "page-size": pageSize = 25 } = params || {};
  const productsUrl = `${environment.api.baseUrl}${environment.api.products.path}`;
  const headers = { "x-v": environment.api.products.version };

  try {
    const response = await axios.get<IncomingProductResponseType>(productsUrl, {
      headers,
      params: {
        page: page,
        "page-size": pageSize,
      },
    });
    const mappedProducts: Product[] = response.data.data.products?.map(
      ProductTransformer.toProduct,
    );
    console.log("mappedProducts", mappedProducts);

    return mappedProducts;
  } catch (error) {
    console.error("[Lib]: Error fetching products:", error);
    throw error;
  }
}

/**
 * This function contains code to retrieve details for a single product and return it as the correct type
 * @param product_id - id of product, retrieved from getProducts() function
 * @returns Promise<ProductDetails>
 */
export async function getProductDetails(
  product_id: string,
): Promise<ProductDetail> {
  const productsUrl = `${environment.api.baseUrl}${environment.api.products.path}/`;
  const headers = { "x-v": environment.api.productDetails.version };
  
  try {
    const response = await axios.get<IncomingProductDetailResponseType>(
      productsUrl + `${product_id}`,
      {
        headers,
      },
    );

    const productDetails = ProductTransformer.toProductDetail(
      response.data.data,
    );

    console.log("productDetails", productDetails);

    return productDetails;
  } catch (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }
}
