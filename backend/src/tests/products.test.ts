import { describe } from '@jest/globals';
import { getProducts, getProductDetails } from '../lib/products';

describe('Products E2E tests', () => {
    describe('getProducts', () => {
        it('returns a promise', () => {
            const res = getProducts();
            expect(res).toBeInstanceOf(Promise);
        });

        it('has correct fields', async () => {
            const res = await getProducts();
            const product = res[0];
            expect(product).toHaveProperty('product_id');
            expect(product).toHaveProperty('effective_from');
            expect(product).toHaveProperty('effective_to');
            expect(product).toHaveProperty('product_category');
            expect(product).toHaveProperty('name');
            expect(product).toHaveProperty('description');
            expect(product).toHaveProperty('brand');
        });
    });

    describe('getProductDetails', () => {
        it('returns a promise', () => {
            const res = getProductDetails('8bba7e425a5a4eeb8ecb7eec4daadf0c');
            expect(res).toBeInstanceOf(Promise);
        });

        it('has correct fields', async () => {
            const productDetails = await getProductDetails('8bba7e425a5a4eeb8ecb7eec4daadf0c');
            expect(productDetails).toHaveProperty('features');
            expect(productDetails).toHaveProperty('eligibility');
            expect(productDetails).toHaveProperty('fees');
        })
    });
});