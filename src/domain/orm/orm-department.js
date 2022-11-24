const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const db = conn.db.connMongo;

exports.GetAll = async () => {
  try {
    return await db.Department.find();
  } catch (err) {
    magic.LogDanger('Cannot getAll departments', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Create = async (info) => {
  try {
    const { name, users, incidents, notices } = info;
    const data = await new db.Department(info);
    data.save();
    return data;
  } catch (err) {
    magic.LogDanger('Cannot create department', err);
    return await { err: { code: 123, message: err } };
  }
};
