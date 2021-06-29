import { Router } from 'express';

import ServiceController from '../controllers/ServiceController';

const serviceRouter = Router();

serviceRouter.get('/', ServiceController.index);

serviceRouter.get('/:id', ServiceController.show);

serviceRouter.post('/', ServiceController.create);

serviceRouter.delete('/:id', ServiceController.delete);

serviceRouter.put('/:id', ServiceController.update);

export default serviceRouter;
