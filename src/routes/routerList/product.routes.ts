import { Router } from 'express';
import { __DEV__ } from '../../utils/constants';
import { asyncController as async } from '../../middleware/asyncHandler';

import { protect } from '../../middleware/auth';
import {
    createProductHandler,
    retrieveProductListHandler,
    updateProductHandler,
} from '../../controller/product.controller';
import { validateBody } from '../../middleware/validate';
import { productSchema, purchaseProductSchema } from '../../zod/product.schema';

const router = Router();

// @desc Get all products
// @route GET /api/v1/products
// @access Private
router.get('/', async(retrieveProductListHandler));

// @desc   Update product
// @route  POST /api/v1/products
// @access Public
router
    .route('/')
    .post(validateBody(productSchema), async(createProductHandler));

// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private
router.put(
    '/:id',
    protect('TOKEN'),
    validateBody(productSchema),
    async(updateProductHandler)
);

// @desc Update product
// @route PUT /api/v1/products/:id
// @access Private
router.delete('/:id', protect('TOKEN'), async(updateProductHandler));

// @desc Purchase product
// @route POST /api/v1/products/:id
// @access Private
router.post(
    '/:id/purchase',
    protect('TOKEN'),
    validateBody(purchaseProductSchema),
    async(updateProductHandler)
);

export default router;
