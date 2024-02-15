import { Router } from 'express';
import { HttpStatusCode } from '../utils/http';
import authRoutes from './routerList/auth.routes';
import productRoutes from './routerList/product.routes';
import userRoutes from './routerList/user.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);

// To check the availability of the server
router.get('/health', (req, res) =>
    res.status(HttpStatusCode.OK).send('Healthy')
);

export default router;
