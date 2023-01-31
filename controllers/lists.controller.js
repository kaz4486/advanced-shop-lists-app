const List = require('../models/list.model');
const User = require('../models/user.model');
const isString = require('../utils/validators/isString');

exports.getAll = async (req, res) => {
  try {
    return res.json(await List.find());
    // return res.json(await List.find().populate('user'));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.post = async (req, res) => {
  console.log('reqbody', req.body);
  const { name, publicationDate, items } = req.body;

  try {
    if ((isString(name), isString(publicationDate), Array.isArray(items))) {
      console.log('1');
      const newList = await List.create({
        name,
        publicationDate,
        items,
      });
      return res.status(201).send({ message: 'New List Added' + newList });
    }
    return res.status(400).send({ message: 'Bad request' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
