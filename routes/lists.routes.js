const express = require('express');
const router = express.Router();

const ListsController = require('../controllers/lists.controller');

router.get('/lists', ListsController.getAll);

router.get('/lists/:id', (req, res) => {
  res.json(db.employees.find((item) => item.id == req.params.id));
});

router.post('/lists', (req, res) => {
  const { firstName, lastName } = req.body;
  db.employees.push({ id: 3, firstName, lastName });
  res.json({ message: 'OK' });
});

router.put('/lists/:id', (req, res) => {
  const { firstName, lastName } = req.body;
  db = db.employees.map((item) =>
    item.id == req.params.id ? { ...item, firstName, lastName } : item
  );
  res.json({ message: 'OK' });
});

router.delete('/lists/:id', (req, res) => {
  db = db.employees.filter((item) => item.id != req.params.id);
  res.json({ message: 'OK' });
});

module.exports = router;
