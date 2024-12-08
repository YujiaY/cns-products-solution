import { Router, Request, Response } from "express";
import {
  getProducts,
  getProductDetails,
  IncomingProductResponseType,
  IncomingPaginationMetaData,
} from "../lib/products";
import axios from "axios";
import { environment } from "../config/environment";

const router: Router = Router();

export interface PaginationQuery {
  page: number;
  "page-size": number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

export function parsePaginationQuery(req: Request): PaginationQuery {
  const page = parseInt(req.query.page as string) || DEFAULT_PAGE;
  const pageSize =
    parseInt(req.query["page-size"] as string) || DEFAULT_PAGE_SIZE;

  return {
    page: Math.max(1, page),
    "page-size": Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE),
  };
}

export function validatePaginationQuery({
  page,
  "page-size": pageSize,
}: PaginationQuery): string | null {
  if (page < 1) {
    return "Page number must be greater than 0";
  }
  if (pageSize < 1 || pageSize > MAX_PAGE_SIZE) {
    return `Page size must be between 1 and ${MAX_PAGE_SIZE}`;
  }
  return null;
}
router.get(
  "/products",
  async (
    req: Request,
    res: Response,
    next: (e: Error) => void,
  ): Promise<any> => {
    try {
      // Parse pagination parameters
      const paginationQuery: PaginationQuery = parsePaginationQuery(req);
      const validationError = validatePaginationQuery(paginationQuery);
      console.log("paginationQuery mark 1", paginationQuery);

      // Validate pagination
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const productsResponse = await getProducts(paginationQuery);

      const productsUrl = `${environment.api.baseUrl}${environment.api.products.path}`;
      const headers = { "x-v": environment.api.products.version };

      console.log("paginationQuery mark 2", paginationQuery);

      const jsonResponse = await axios.get<IncomingProductResponseType>(
        productsUrl,
        {
          headers,
          params: paginationQuery,
        },
      );

      // Extract pagination info
      const metaData: IncomingPaginationMetaData = jsonResponse.data.meta;
      console.log("jsonResponse metaData", metaData);

      const paginationInfo = {
        totalRecords: metaData.totalRecords,
        totalPages: metaData.totalPages,
        currentPage: paginationQuery.page,
        pageSize: paginationQuery["page-size"],
      };

      console.log("paginationInfo", paginationInfo);

      // Set the X-Pagination header
      res.set("X-Pagination", JSON.stringify(paginationInfo));
      res.set("Access-Control-Expose-Headers", "X-Pagination");

      // Send the final result
      res.json(productsResponse);
    } catch (error) {
      console.log("[routes]: Error fetching products:", error.message);
      next(error);
    }
  },
);

router.get(
  "/productDetails",
  async (
    req: Request,
    res: Response,
    next: (e: Error) => void,
  ): Promise<any> => {
    try {
      const productId = req.query["productId"] as string;

      if (!productId) {
        return res.status(400).json({ error: "Product Id is required" });
      }

      const productDetails = await getProductDetails(productId);
      res.json(productDetails);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
