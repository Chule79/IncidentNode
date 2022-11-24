const conn = require('../repositories/mongo.repository');
const magic = require('../../utils/magic');

exports.GetAll = async () => {
  try {
    return await conn.db.connMongo.Department.find();
  } catch (error) {
    magic.LogDanger('Cannot getAll departments', error);
    return await { err: { code: 123, message: error } };
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
    data.save();
    return true;
  } catch (error) {
    magic.LogDanger('Cannot create department', error);
    return await { err: { code: 123, message: error } };
  }
};
