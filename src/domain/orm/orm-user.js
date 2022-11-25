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

exports.Login = async (req) => {
  try {
    const userByNickname = await db.User.findOne({
      nickname: req.body.nickname,
    });
    const userByGmail = await db.User.findOne({ gmail: req.body.gmail });
    const userInDB = userByNickname || userByGmail;
    if (!userInDB) return magic.LogDanger("Login credentials doesn't exist");

    if (bcrypt.compareSync(req.body.password, userInDB.password)) {
      userInDB.password = null;
      const token = jwt.sign(
        {
          id: userInDB._id,
          nickname: userInDB.nickname,
        },
        req.app.get('secretKey'),
        {
          expiresIn: '1h',
        }
      );
      return { user: userInDB, token: token };
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
    return await db.User.find().populate('department incidents');
  } catch (err) {
    magic.LogDanger('Cannot getAll users', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Update = async (req) => {
  try {
    const { id } = req.params;
    const user = new db.User(req.body);
    user._id = id;
    const updatedUser = await db.User.findByIdAndUpdate(id, user);
    return updatedUser;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

exports.Delete = async (req) => {
  try {
    const { id } = req.params;
    const deletedUser = await db.User.findByIdAndDelete(id);
    return deletedUser;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};

exports.GetOne = async (req) => {
  try {
    const { id } = req.params;
    const user = await db.User.findById(id);
    return user;
  } catch (err) {
    console.log('err = ', err);
    return res
      .status(enum_.CODE_INTERNAL_SERVER_ERROR)
      .send(
        await magic.ResponseService('Failure', enum_.CRASH_LOGIC, 'err', '')
      );
  }
};
