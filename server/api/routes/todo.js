import express from 'express';

import * as todoController from '../controllers/todo.js'

const router = express.Router();

router.route('/todo')
    .get(todoController.index)
    .post(todoController.save);

router.route('/todo/:id')
.get(todoController.get)
.put(todoController.update)
.delete(todoController.remove);

export default router;