const List = require('../models/list.model');
const User = require('../models/user.model');
const isString = require('../utils/validators/isString');

exports.getAll = async (req, res) => {
  try {
    return res.json(await List.find().populate('user'));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getListsByUser = async (req, res) => {
  try {
    const user = await User.findOne({ login: req.params.user });
    const lists = await List.find({ user: user._id });
    return res.json(lists);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.post = async (req, res) => {
  console.log(req.session.user.login);
  console.log('reqbody', req.body);
  const { name, publicationDate, items } = req.body;

  try {
    const user = await User.findOne({ login: req.session.user.login });
    if (!user) {
      return res.status(400).send({ message: 'Bad request' });
    }
    if (
      (isString(name),
      isString(publicationDate),
      Array.isArray(items),
      items.length !== 0)
    ) {
      const newList = await List.create({
        name,
        publicationDate,
        items,
        user: user._id,
        // internalId,
      });
      return res.status(201).send({ message: 'New List Added' + newList });
    }
    return res.status(400).send({ message: 'Bad request' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
