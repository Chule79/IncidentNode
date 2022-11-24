const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

const db = conn.db.connMongo;

exports.GetAll = async () => {
  try {
    return await db.Notice.find().populate('departments');
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

exports.GetOne = async (req) => {
  try {
    const { id } = req.params;
    const notice = await db.Notice.findById(id).populate('departments');
    return notice;
  } catch (err) {
    magic.LogDanger('Cannot get notice', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Update = async (req) => {
  try {
    const { id } = req.params;
    const notice = await new db.Notice(req.body);
    notice._id = id;
    console.log(notice);
    const updateNotice = await db.Notice.findByIdAndUpdate(id, notice);
    return updateNotice;
  } catch (err) {
    magic.LogDanger('Cannot update notice', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Delete = async (req) => {
  try {
    const { id } = req.params;
    const notice = await db.Notice.findByIdAndDelete(id);
    return notice;
  } catch (err) {
    magic.LogDanger('Cannot delete notice', err);
    return await { err: { code: 123, message: err } };
  }
};
