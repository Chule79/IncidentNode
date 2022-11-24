const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const db = conn.db.connMongo;

exports.Create = async (req, res) => {
  try {
    const newUser = new db.User(req.body);
    const userExists = db.findOne({ nickname: newUser.nickname });
    if (userExists) return magic.LogDanger('User nickname is already in use');
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    magic.LogDanger('User register failed', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Login = async (req, res, next) => {
  try {
    const userNickname = await db.findOne({ nickname: req.body.nickname });
    const userGmail = await db.findOne({ nickname: req.body.nickname });
    const userInDB = !userNickname || !userGmail;
    if (userInDB) return magic.LogDanger("Login credentials doesn't exist");
    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      userInDB.password = null;
      const token = jwt.sign(
        {
          id: userInDB._id,
          nickname: userInDB.nickname,
        },
        req.app.get.get('secretKey'),
        {
          expiresIn: '1h',
        }
      );
      return res.json({
        status: 200,
        message: 'Welcome user',
        user: userInDB,
        token: token,
      });
    } else {
      return next('User password incorrect');
    }
  } catch (err) {
    magic.LogDanger('User login failed', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.User.find().populate('incidents');
  } catch (err) {
    magic.LogDanger('Cannot getAll users', err);
    return await { err: { code: 123, message: err } };
  }
};
