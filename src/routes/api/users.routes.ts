import { Router } from "express";
import * as controllers from '../../controllers/users.controllers';

const routes = Router();

routes.post('/', controllers.create);
routes.get('/', controllers.showall);
routes.get('/:id', controllers.showone);
routes.patch('/:id', controllers.updateone);
routes.delete('/:id', controllers.deleteone);

// routes.route('/').get(controllers.showall).post(controllers.create);



export default routes;