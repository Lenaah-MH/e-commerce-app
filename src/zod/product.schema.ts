import { object, string, number } from 'zod';

export const productSchema = object({
    name: string({
        required_error: 'Name is required',
    }),
    description: string(),
    quantity: number(),
});

export const purchaseProductSchema = object({
    quantity: number({
        required_error: 'Quantity is required',
    }),
});
