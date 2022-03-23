import { Router } from "express";
import * as controllers from '../../controllers/orderlists.controllers';
import validatemiddlware from "../../middleware/authentication.middleware";

const routes = Router();


routes.get('/:id', validatemiddlware, controllers.getAllOrders);


export default routes;