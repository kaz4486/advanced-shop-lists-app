const express = require('express');
const router = express.Router();

const ListsController = require('../controllers/lists.controller');

router.get('/lists', ListsController.getAll);

router.get('/lists/:user', ListsController.getListsByUser);

router.post('/lists', ListsController.post);

router.patch('/lists/:id', ListsController.patch);

router.delete('/lists/:id', ListsController.delete);

module.exports = router;
