const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const db = conn.db.connMongo;

exports.GetAll = async () => {
  try {
    return await db.Notice.find();
  } catch (err) {
    magic.LogDanger('Cannot getAll notices', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Create = async (info) => {
  try {
    const { title, description, departments } = info;
    const data = await new db.Notice(info);
    const savedNotice = await data.save();
    return savedNotice;
  } catch (err) {
    magic.LogDanger('Cannot create notice', err);
    return await { err: { code: 123, message: err } };
  }
};
