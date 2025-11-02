import db from '../models/index.js';
import { Op } from 'sequelize';
const Todo = db.Todo;
const Category = db.Category;
const User = db.User;

export async function getAll(req, res) {
    try {
        const { page, limit, offset } = getPaginationParams(req.query);
        const categoryId = req.query.category;
        const search = req.query.search;
        const sort = req.query.sort;

        const order = getSortOrder(sort);
        const where = getWhereClause(categoryId, search);

        if (req.user.role !== 'admin') {
            where.user_id = req.user.id;
        }

        const { count, rows } = await Todo.findAndCountAll({
            include: [
                {
                    model: Category,
                    as: 'category',
                    attributes: ['name']
                }, {
                    model: User,
                    as: 'user',
                    attributes: ['username']
                }
            ],
            where,
            order,
            limit,
            offset
        });

        const meta = getMeta(count, rows.length, limit, page);
        res.json({ data: rows, meta });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

export async function getById(req, res) {
    const id = req.params.id;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: 'Task not found' })
        }

        res.json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

export async function create(req, res) {
    const { title, category_id } = req.body;
    try {
        const newTodo = await Todo.create({ title, category_id, user_id: req.user.id });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

export async function update(req, res) {
    const id = req.params.id;
    const { title, completed, category_id } = req.body;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }

        todo.title = title ?? todo.title;
        todo.category_id = category_id ?? todo.category_id;
        todo.completed = completed ?? todo.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

export async function toggleCompleted(req, res) {
    const id = req.params.id;

    try {
        const todo = await Todo.findByPk(id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        todo.completed = !todo.completed;
        await todo.save();
        res.json(todo);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
}

export async function remove(req, res) {
    const id = req.params.id;
    try {
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: 'Task not found' });
        }

        await todo.destroy();
        res.status(204).send();;
    } catch (error) {
        res.status(500).json({ error: 'Server Error' });
    }
}

function getPaginationParams(query) {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const offset = (page * limit) - limit;
    return { page, limit, offset };
}

function getSortOrder(sort) {
    if (!sort) return [['created_at', 'DESC']];

    const [field, direction] = sort.split(':');
    const validDirection = direction?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    let column;

    switch (field) {
        case 'createdAt': column = 'created_at'; break;
        case 'updatedAt': column = 'updated_at'; break;
        case 'dueDate': column = 'due_date'; break;
        default: column = 'created_at';
    }

    return [[column, validDirection]];
}

function getWhereClause(categoryId, search) {
    const where = {};
    if (categoryId) where.category_id = categoryId;
    if (search) where.title = { [Op.iLike]: `%${search}%` };
    return where;
}

function getMeta(count, rowsLength, limit, page) {
    return {
        total: count,
        count: rowsLength,
        limit,
        pages: Math.ceil(count / limit),
        currentPage: page,
    };
}





