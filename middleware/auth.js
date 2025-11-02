import jwt from 'jsonwebtoken';
import db from '../models/index.js';
const Todo = db.Todo;

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export function authenticateJWT(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.sendStatus(401);
    }

    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        next();
    } catch (err) {
        console.log(err);
        return res.sendStatus(401).json({ message: 'Invalid token' });;
    }
}

export function isAdmin(req, res, next) {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    next();
}

export async function isOwnerOrAdmin(req, res, next) {
    const user = req.user;
    const todoId = req.params.id;

    if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const todo = await Todo.findByPk(todoId);

        if (!todo) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (user.role === 'admin' || todo.user_id === user.id) {
            return next();
        }

        return res.status(403).json({ message: 'Forbidden: Not owner or admin' });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
}