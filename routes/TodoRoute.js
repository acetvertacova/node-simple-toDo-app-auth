import express from 'express';
import * as todoController from "../controllers/TodoController.js";
import { authenticateJWT, isAdmin, isOwnerOrAdmin } from '../middleware/auth.js';

const todoRouter = express.Router();

todoRouter.get('/', authenticateJWT, todoController.getAll);
todoRouter.post('/', authenticateJWT, todoController.create);
todoRouter.get('/:id', authenticateJWT, isOwnerOrAdmin, todoController.getById);
todoRouter.put('/:id', authenticateJWT, isAdmin, todoController.update);
todoRouter.delete('/:id', authenticateJWT, isAdmin, todoController.remove);
todoRouter.patch('/:id/toggle', authenticateJWT, isAdmin, todoController.toggleCompleted);

export default todoRouter;