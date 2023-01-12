const List = require('../models/list.model');
const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  console.log('jestem');
  try {
    console.log('jestem');
    return res.json(await List.find().populate('user'));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
