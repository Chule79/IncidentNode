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


exports.GetOne = async (req) => {
  try {
    const { id } = req.params;
    const department = await db.Department.findById(id);
    if (!department) return magic.LogDanger('Cannot get the department');
    return department;
  } catch (err) {
    magic.LogDanger('Cannot get the department', err);
    return await { err: { code: 123, message: err } };
  }
};
exports.GetName = async (req) => {
  try {
    const { name } = req.params;
    const department = await db.Department.findOne({name: name});
    if (!department) return magic.LogDanger('Cannot get the department');
    return department;
  } catch (err) {
    magic.LogDanger('Cannot get the department', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Update = async (req) => {
  try {
    const { id } = req.params;
    const department = new db.Department(req.body);
    department._id = id;
    const updatedDepartment = await db.Department.findByIdAndUpdate(
      id,
      department
    );
    console.log(updatedDepartment);
    return updatedDepartment;
  } catch (err) {
    magic.LogDanger('Cannot update the department', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Delete = async (req) => {
  try {
    const { id } = req.params;
    const deletedDepartment = await db.Department.findByIdAndDelete(id);
    return deletedDepartment;
  } catch (err) {
    magic.LogDanger('Cannot delete the department', err);
    return await { err: { code: 123, message: err } };
  }
};

