const express = require('express');
const router = express.Router();

const ListsController = require('../controllers/lists.controller');

router.get('/lists', ListsController.getAll);

// router.get('/lists/:id', (req, res) => {
//   res.json(db.employees.find((item) => item.id == req.params.id));
// });

router.get('/lists/:user', ListsController.getListsByUser);

router.post('/lists', ListsController.post);

router.patch('/lists/:id', ListsController.patch);

router.delete('/lists/:id', ListsController.delete);

// router.put('/lists/:id', (req, res) => {
//   const { firstName, lastName } = req.body;
//   db = db.employees.map((item) =>
//     item.id == req.params.id ? { ...item, firstName, lastName } : item
//   );
//   res.json({ message: 'OK' });
// });

// router.delete('/lists/:id', (req, res) => {
//   db = db.employees.filter((item) => item.id != req.params.id);
//   res.json({ message: 'OK' });
// });

module.exports = router;
