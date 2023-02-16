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
  const { name, publicationDate, items, user } = req.body;

  try {
    const foundUser = await User.findOne({ login: user });
    if (!foundUser) {
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
        user: foundUser._id,
        // internalId,
      });
      return res.status(201).send({ message: 'New List Added' + newList });
    }
    return res.status(400).send({ message: 'Bad request' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.patch = async (req, res) => {
  const { name, items, user } = req.body;

  try {
    const list = await List.findOne({ _id: req.params.id });
    console.log(list);
    const foundUser = await User.findOne({ login: user });
    console.log(user);
    let modifiedList = {};
    if (!list || list.user != foundUser._id) {
      console.log('bad');
      return res.status(400).send({ message: 'Bad request' });
    }
    if (isString(name) && Array.isArray(items) && items !== []) {
      console.log('1');
      modifiedList = await List.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { name: name, items: items },
          $currentDate: { lastModified: true },
        },
        { new: true }
      );
      console.log(modifiedList);
      return res.status(201).send({ message: 'List modified', modifiedList });
    }
    if (
      name !== undefined &&
      isString(name) &&
      (!Array.isArray(items) || items === [])
    ) {
      modifiedList = await list.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { name: name },
          $currentDate: { lastModified: true },
        },
        { new: true }
      );
      return res.status(201).send({ message: 'List modified' + modifiedList });
    }
    if (
      Array.isArray(items) &&
      items !== [] &&
      (name === undefined || !isString(name))
    ) {
      modifiedList = await list.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: { items: items },
          $currentDate: { lastModified: true },
        },
        { new: true }
      );
      return res.status(201).send({ message: 'List modified' + modifiedList });
    }
    return res.status(400).send({ message: 'Bad request' });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const list = await List.findOne({ _id: req.params.id });

    const foundUser = await User.findOne({ login: req.session.user.login });
    console.log(foundUser);
    if (list.user != foundUser._id) {
      return res.status(400).send({ message: 'Bad request' });
    }
    if (list) {
      await list.deleteOne({ _id: req.params.id });
      return res.json({ message: 'List removed', removedList: list });
    }
    return res.status(404).json({ message: 'Not found' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
