import db from '../models/index.js';
import { Op } from 'sequelize';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const Todo = db.Todo;
const User = db.User;
const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key';

export async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const existingUser = await User.findOne({
            where: {
                [Op.or]: [{ email }, { username }]
            }
        });

        if (existingUser) {
            throw new Error('Username or email already in use');
        }

        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

export async function login(req, res) {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(401).send("Credintials are wrong");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send("Credintials are wrong");
        }

        const payload = { id: user.id, username: user.username, role: user.role };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "15m" });
        res.json({ token: token });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
}

export async function getProfile(req, res) {
    const user = await User.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
    });

    if (!user) return res.status(401).json({ message: "User not found" });
    res.json(user);
}