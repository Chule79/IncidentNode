const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const db = conn.db.connMongo;

exports.Create = async (info) => {
  try {
    const newUser = new db.User(info);

    const userNickname = await db.User.findOne({ nickname: info.nickname });
    const userGmail = await db.User.findOne({ gmail: info.gmail });
    const userExists = userNickname || userGmail;
    if (userExists) return magic.LogDanger('That user already exists');

    newUser.password = bcrypt.hashSync(newUser.password, 16);
    const savedUser = await newUser.save();
    return savedUser;
  } catch (err) {
    magic.LogDanger('User register failed', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Login = async (req, res, next) => {
  try {
    const userNickname = await db.User.findOne({ nickname: info.nickname });
    const userGmail = await db.User.findOne({ gmail: info.gmail });
    const userInDB = userNickname || userGmail;
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
    return await db.User.find();
  } catch (err) {
    magic.LogDanger('Cannot getAll users', err);
    return await { err: { code: 123, message: err } };
  }
};
