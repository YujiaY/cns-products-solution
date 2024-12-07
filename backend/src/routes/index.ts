import { Router, Request, Response } from "express";
import { getProducts, getProductDetails } from "../lib/products";

const router: Router = Router();

export interface PaginationQuery {
  page: number;
  pageSize: number;
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
    pageSize: Math.min(Math.max(1, pageSize), MAX_PAGE_SIZE),
  };
}

export function validatePaginationQuery({
  page,
  pageSize,
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
      const pagination = parsePaginationQuery(req);
      const validationError = validatePaginationQuery(pagination);

      // Validate pagination
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      const productsResponse = await getProducts(pagination);
      res.json(productsResponse);
    } catch (error) {
      console.log(error.message);
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
      const productId = req.query["product_id"] as string;

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
