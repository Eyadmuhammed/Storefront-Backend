import { Router } from "express";
import * as controllers from '../../controllers/orders.controllers';
import validatemiddlware from "../../middleware/authentication.middleware";

const routes = Router();

routes.post('/', validatemiddlware, controllers.create);
routes.get('/', validatemiddlware, controllers.showall);
routes.get('/:id', validatemiddlware, controllers.showone);
routes.patch('/:id', validatemiddlware, controllers.updateone);
routes.delete('/:id', validatemiddlware, controllers.deleteone);


export default routes;