import { PrismaClient, Product } from '@prisma/client';
import { errorFormatter } from '../middleware/errorHandler';
const prisma = new PrismaClient({ errorFormat: 'minimal' });

export const retrieveProductListService = async () => {
    try {
        return await prisma.product.findMany();
    } catch (error) {
        errorFormatter(error);
    }
};

export const createProductService = async ({
    name,
    description,
    quantity,
}: Product) => {
    console.log('here', name);

    try {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                quantity,
            },
        });
    } catch (e) {
        console.log('here product', e);
    }

    return {
        // name: product.name,
        // description: product.description,
        // quantity: product.quantity,
    };
};

export const updateProductService = async ({
    id,
    name,
    description,
    quantity,
}: Product) => {
    try {
        return await prisma.product.update({
            where: {
                id: id,
            },
            data: {
                name,
                description,
                quantity,
            },
        });
    } catch (error) {
        errorFormatter(error);
    }
};

export const deleteProductService = async (productId: string) => {
    try {
        return prisma.product.delete({
            where: {
                id: productId,
            },
        });
    } catch (error) {
        errorFormatter(error);
    }
};

export const purchaseProductService = async ({ id, quantity }: Product) => {
    try {
        // Fetch the current product from the database
        const currentProduct = await prisma.product.findUnique({
            where: { id },
        });
        if (!currentProduct) {
            // Handle the case where the product is not found
            throw new Error('Product not found');
        }

        // Calculate the new quantity by subtracting the purchased quantity
        const newQuantity = currentProduct.quantity - quantity;

        // Update the product with the new quantity
        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                quantity: newQuantity,
            },
        });

        return updatedProduct;
    } catch (error) {
        errorFormatter(error);
    }
};
