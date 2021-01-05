import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middleware/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();
const providersController = new ProvidersController();
providersRouter.use(ensureAuthenticated);
// providersRouter.get('/', async (req, res) => {
//   const appointments = await appointmentRepository.find();
//   return res.json(appointments);
// });

providersRouter.get('/', providersController.index);
export default providersRouter;
