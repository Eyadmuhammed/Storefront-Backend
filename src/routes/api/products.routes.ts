import { Router } from "express";
import * as controllers from '../../controllers/products.controllers';
import validatemiddlware from "../../middleware/authentication.middleware";

const routes = Router();

routes.post('/', controllers.create);
routes.get('/', validatemiddlware, controllers.showAllproducts);
routes.get('/:id', validatemiddlware, controllers.showoneproduct);
routes.patch('/:id', validatemiddlware, controllers.updateoneproduct);
routes.delete('/:id', validatemiddlware, controllers.deleteoneproduct);


export default routes;