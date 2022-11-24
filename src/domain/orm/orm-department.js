const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Department.find();
  } catch (err) {
    magic.LogDanger('Cannot getAll departments', err);
    return await { err: { code: 123, message: err } };
  }
};

exports.Create = async (Name, Users, Incidents, Notices) => {
  try {
    const data = await new conn.db.connMongo.Department({
      name: Name,
      users: Users,
      incidents: Incidents,
      notices: Notices,
    });
    console.log(data);
    data.save();
    return true;
  } catch (err) {
    magic.LogDanger('Cannot create department', err);
    return await { err: { code: 123, message: err } };
  }
};
