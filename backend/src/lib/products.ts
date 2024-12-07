import axios from "axios";
import {
  IncomingProduct,
  IncomingProductDetail,
  Product,
  ProductDetail,
} from "../types/productTypes";
import { ProductTransformer } from "../helpers/ProductTypesMapper";

interface PaginationParams {
  page?: number;
  pageSize?: number;
}

interface IncomingPaginationMetaData {
  totalRecords?: number;
  totalPages?: number;
}

interface IncomingProductResponseType {
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
  meta: {
    totalRecords: number;
    totalPages: number;
  };
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
  params?: PaginationParams,
): Promise<Product[]> {
  const { page = 1, pageSize = 25 } = params || {};
  const url: string =
    "https://api.commbank.com.au/public/cds-au/v1/banking/products";
  const headers = { "x-v": 3 }; // TODO: value 3 into env

  try {
    const response = await axios.get<IncomingProductResponseType>(url, {
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
    console.error("Error fetching products:", error);
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
  const url: string = `https://api.commbank.com.au/public/cds-au/v1/banking/products/${product_id}`;
  const headers = { "x-v": 4 }; // TODO: value 4 into env
  try {
    const response = await axios.get<IncomingProductDetailResponseType>(url, {
      headers,
    });

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
