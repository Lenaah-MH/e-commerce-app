import { Request, Response } from 'express';
import { HttpStatusCode } from '../utils/http';
import {
    createProductService,
    deleteProductService,
    purchaseProductService,
    retrieveProductListService,
    updateProductService,
} from '../service/product.service';
import { TypedRequestBody } from 'zod-express-middleware';
import { productSchema } from '../zod/product.schema';
import { Product } from '@prisma/client';

export const retrieveProductListHandler = async (
    req: Request,
    res: Response
) => {
    const products = await retrieveProductListService();
    return res.status(HttpStatusCode.OK).json(products);
};

export const createProductHandler = async (
    req: TypedRequestBody<typeof productSchema>,
    res: Response
) => {
    const body = req.body;

    const product = {
        ...body,
    } as Product;

    await createProductService(product);

    return res.status(HttpStatusCode.CREATED).json({
        message: 'Product Created !',
    });
};

export const updateProductHandler = async (
    req: TypedRequestBody<typeof productSchema>,
    res: Response
) => {
    const body = req.body;

    const product = {
        ...body,
        id: req.params.id,
    } as Product;

    await updateProductService(product);
    return res.status(HttpStatusCode.OK).json({ message: 'Producat updated' });
};

export const deleteProductHandler = async (
    req: TypedRequestBody<typeof productSchema>,
    res: Response
) => {
    const productId = req.params.id;

    await deleteProductService(productId);
    return res.status(HttpStatusCode.OK).json({ message: 'Producat deleted' });
};

export const purchaseProductHandler = async (
    req: TypedRequestBody<typeof productSchema>,
    res: Response
) => {
    const body = req.body;

    const product = {
        ...body,
        id: req.params.id,
    } as Product;

    await purchaseProductService(product);
    return res.status(HttpStatusCode.OK).json({ message: 'Producat updated' });
};
