import { Router, Request, Response } from 'express';
import { getProducts, getProductDetails } from '../lib/products';

const router: Router = Router();

router.get('/products', async (req: Request, res: Response, next: (e: Error) => void): Promise<any> => {
    
});

router.get('/productDetails', async (req: Request, res: Response, next: (e: Error) => void): Promise<any> => {
    
});

export default router;