import { Router } from "express";
import * as controllers from '../../controllers/orderlists.controllers';
import validatemiddlware from "../../middleware/authentication.middleware";

const routes = Router();

routes.get('/', controllers.showall);
routes.get('/:id', controllers.showone);
routes.post('/', validatemiddlware, controllers.create);
routes.patch('/:id', validatemiddlware, controllers.updateone);
routes.delete('/:id', validatemiddlware, controllers.deleteone);


export default routes;