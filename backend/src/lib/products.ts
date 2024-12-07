import axios from "axios";
import { Product, ProductDetails } from "../types/productTypes";

/**
 * This function should contain code to retrieve the product data
 * @returns <Promise>
 */
export async function getProducts(): Promise<Product[]> {
    const url: string = 'https://api.commbank.com.au/public/cds-au/v1/banking/products';
    const headers = { 'x-v': 3 };
    return Promise.resolve([]); // replace line - stand-in return
}

/**
 * This function should contain code to retrieve details for a single product and return it as the correct type
 * @param product_id - id of product, retrieved from getProducts() function
 * @returns Promise<ProductDetails>
 */
export async function getProductDetails(product_id: string): Promise<ProductDetails> {
    const url: string = 'https://api.commbank.com.au/public/cds-au/v1/banking/products';
    const headers = { 'x-v': 3 };
    return Promise.resolve({}); // replace line - stand-in return
}