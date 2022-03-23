import { Router } from "express";
import usersRoutes from '../routes/api/users.routes';
import productsRoutes from '../routes/api/products.routes';
import ordersRoutes from '../routes/api/orders.routes';
import orderlistsRoutes from '../routes/api/orderlists.routes';
import orderlistsforuserRoutes from '../routes/api/orderlistsforuser.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/products', productsRoutes);
routes.use('/orders', ordersRoutes);
routes.use('/orderlists', orderlistsRoutes);
routes.use('/orderlists_foruser', orderlistsforuserRoutes);

export default routes;