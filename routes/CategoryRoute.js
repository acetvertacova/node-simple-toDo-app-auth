import express from 'express';
import * as categoryController from "../controllers/CategoriesController.js";
import { authenticateJWT, isAdmin } from '../middleware/auth.js';
const categoryRouter = express.Router();

categoryRouter.get('/', authenticateJWT, isAdmin, categoryController.getAll);
categoryRouter.post('/', authenticateJWT, isAdmin, categoryController.create);
categoryRouter.get('/:id', authenticateJWT, isAdmin, categoryController.getById);
categoryRouter.put('/:id', authenticateJWT, isAdmin, categoryController.update);
categoryRouter.delete('/:id', authenticateJWT, isAdmin, categoryController.remove);

export default categoryRouter;
